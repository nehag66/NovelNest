import { BookCondition } from 'app/models/novel';

export function calculateDiscountPercentage(
	mrp: number,
	price: number,
): number {
	if (mrp <= 0) {
		throw new Error('MRP should be greater than 0');
	}

	const discount = ((mrp - price) / mrp) * 100;
	return parseFloat(discount.toFixed(2));
}

export function getBookCondition(condition: string): string {
	switch (condition) {
		case BookCondition.Excellent:
			return 'Excellent';
		case BookCondition.Good:
			return 'Good';
		case BookCondition.Fair:
			return 'Fair';
		default:
			return 'Unknown';
	}
}
