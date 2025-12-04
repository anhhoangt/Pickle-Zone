import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

export interface FilterState {
    search: string;
    category: string;
    condition: string;
    minPrice: string;
    maxPrice: string;
}

interface ProductFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onSearch: () => void;
    onReset: () => void;
}

const categories = [
    'Paddles',
    'Balls',
    'Bags',
    'Apparel',
    'Shoes',
    'Accessories',
    'Court Equipment',
];

const conditions = ['NEW', 'USED', 'GOOD'];

export function ProductFilters({
    filters,
    onFiltersChange,
    onSearch,
    onReset,
}: ProductFiltersProps) {
    const [showFilters, setShowFilters] = useState(false);

    const updateFilter = (key: keyof FilterState, value: string) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const hasActiveFilters =
        filters.search ||
        filters.category ||
        filters.condition ||
        filters.minPrice ||
        filters.maxPrice;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            {/* Search Bar */}
            <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search products by title or description..."
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                        className="pl-10"
                    />
                </div>
                <Button onClick={onSearch} className="px-6">
                    Search
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Category Filter */}
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={filters.category}
                                onValueChange={(value) => updateFilter('category', value)}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Condition Filter */}
                        <div>
                            <Label htmlFor="condition">Condition</Label>
                            <Select
                                value={filters.condition}
                                onValueChange={(value) => updateFilter('condition', value)}
                            >
                                <SelectTrigger id="condition">
                                    <SelectValue placeholder="All Conditions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Conditions</SelectItem>
                                    {conditions.map((cond) => (
                                        <SelectItem key={cond} value={cond}>
                                            {cond}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Min Price */}
                        <div>
                            <Label htmlFor="minPrice">Min Price ($)</Label>
                            <Input
                                id="minPrice"
                                type="number"
                                placeholder="0"
                                value={filters.minPrice}
                                onChange={(e) => updateFilter('minPrice', e.target.value)}
                                min="0"
                                step="1"
                            />
                        </div>

                        {/* Max Price */}
                        <div>
                            <Label htmlFor="maxPrice">Max Price ($)</Label>
                            <Input
                                id="maxPrice"
                                type="number"
                                placeholder="1000"
                                value={filters.maxPrice}
                                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                                min="0"
                                step="1"
                            />
                        </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-gray-500">
                            {hasActiveFilters && 'Active filters applied'}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onReset}
                                disabled={!hasActiveFilters}
                                className="gap-2"
                            >
                                <X className="h-4 w-4" />
                                Clear Filters
                            </Button>
                            <Button size="sm" onClick={onSearch}>
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
