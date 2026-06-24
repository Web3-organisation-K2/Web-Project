import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-temporaire';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Non authentifié' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        username: true,
        bio: true,
        company: true,
        title: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: 'Token invalide' },
      { status: 401 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Non authentifié' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const body = await request.json();

    const { name, avatar, username, bio, company, title, role } = body;

    const updatedUser = await db.user.update({
      where: { id: decoded.userId },
      data: {
        name,
        avatar,
        username,
        bio,
        company,
        title,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        username: true,
        bio: true,
        company: true,
        title: true,
        role: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Erreur de mise à jour:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}