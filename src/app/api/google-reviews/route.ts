import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Google Places data');
    }

    const data = await response.json();
    
    return NextResponse.json({
      rating: data.result.rating || 0,
      totalReviews: data.result.reviews?.length || 0
    });
  } catch (error) {
    console.error('Error fetching Google Places data:', error);
    return NextResponse.json({ rating: 0, totalReviews: 0 }, { status: 500 });
  }
}