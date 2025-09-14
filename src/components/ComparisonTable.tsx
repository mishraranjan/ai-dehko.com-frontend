'use client';
import { Product } from '../lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface ComparisonTableProps { products: Product[]; }

export function ComparisonTable({ products }: ComparisonTableProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Compare Products</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Attribute</TableHead>
            {products.map(p => <TableHead key={p._id}>{p.name}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Description</TableCell>
            {products.map(p => <TableCell key={p._id}>{p.description}</TableCell>)}
          </TableRow>
          <TableRow>
            <TableCell>Price</TableCell>
            {products.map(p => <TableCell key={p._id}>{p.price ? `$${p.price}` : 'N/A'}</TableCell>)}
          </TableRow>
          <TableRow>
            <TableCell>Categories</TableCell>
            {products.map(p => <TableCell key={p._id}>{p.categories.join(', ')}</TableCell>)}
          </TableRow>
          <TableRow>
            <TableCell>Tags</TableCell>
            {products.map(p => <TableCell key={p._id}>{p.tags.join(', ')}</TableCell>)}
          </TableRow>
          <TableRow>
            <TableCell>USPs</TableCell>
            {products.map(p => <TableCell key={p._id}>{p.usps.join(', ')}</TableCell>)}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}