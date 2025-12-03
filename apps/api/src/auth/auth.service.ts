import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async signup(signupDto: SignupDto) {
        const existingUser = await this.usersService.findOneByEmail(signupDto.email);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(signupDto.password, salt);

        const user = await this.usersService.create({
            email: signupDto.email,
            passwordHash,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName,
        });

        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const user = await this.usersService.findOneByEmail(forgotPasswordDto.email);
        if (!user) {
            // Don't reveal if user exists
            return { message: 'If a user with this email exists, a password reset link has been sent.' };
        }

        const resetToken = uuidv4();
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        await this.usersService.update(user.id, {
            resetToken,
            resetTokenExpiry,
        } as any);

        // TODO: Send email with reset link
        console.log(`Reset token for ${user.email}: ${resetToken}`);
        console.log(`Reset link: http://localhost:5173/reset-password?token=${resetToken}`);

        return { message: 'If a user with this email exists, a password reset link has been sent.' };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        // In a real app, we would find by token directly, but Prisma doesn't support finding by optional unique fields easily without raw query or schema change to make it unique.
        // For now, we'll assume the token is unique enough or we'd need to pass email too.
        // Actually, let's just find the user who has this token. Since it's not unique in schema, we might have issues if we don't enforce uniqueness.
        // But for this MVP, let's scan or assume we can find it.
        // Better approach: The user clicks a link with token.

        // Let's find the first user with this token and valid expiry
        const users = await this.usersService.findAll(); // Not efficient for production!
        const user = users.find(u => (u as any).resetToken === resetPasswordDto.token && (u as any).resetTokenExpiry > new Date());

        if (!user) {
            throw new BadRequestException('Invalid or expired reset token');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(resetPasswordDto.newPassword, salt);

        await this.usersService.update(user.id, {
            passwordHash,
            resetToken: null,
            resetTokenExpiry: null,
        } as any);

        return { message: 'Password successfully reset' };
    }
}
