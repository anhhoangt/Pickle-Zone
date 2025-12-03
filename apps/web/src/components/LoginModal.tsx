import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            You need to be logged in to add items to your cart.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 mt-4">
          <Button asChild className="w-full">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
