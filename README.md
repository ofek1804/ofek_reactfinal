# BoostMe

פלטפורמה בעברית לפיתוח ביטחון מקצועי עבור מנהלים, עצמאים ואנשי מקצוע. BoostMe ממירה מטרה מקצועית לפעולות יומיות קצרות, מעקב התקדמות ויומן אישי.

## למה BoostMe?

אפליקציות מיינדפולנס כלליות, קורסים דיגיטליים ומאמן אישי הם חלופות נפוצות. BoostMe מתמקדת בביטחון מקצועי ובהרגלים מדידים: בוחרים מטרה, מבצעים אתגר קצר ורואים התקדמות.

## יכולות

- דף נחיתה רספונסיבי לחלוטין, ב-RTL.
- הרשמה, התחברות והגנת נתיבים.
- דשבורד, אתגרים, יומן, התקדמות, פרופיל והישגים.
- תצוגת מובייל עם ניווט תחתון נוח.
- תמיכה בפריסת SPA ב-Vercel, כולל רענון נתיבים פנימיים.

## טכנולוגיות

- React 18 ו-Vite
- React Router
- Lucide React
- Supabase JS (מוכן לחיבור אימות ומסד נתונים)
- Vercel

## הרצה מקומית

```bash
npm install
npm run dev
```

לבניית גרסת ייצור:

```bash
npm run build
```

## משתני סביבה

צור קובץ `.env.local` עבור חיבור Supabase:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_EMAIL=admin@example.com
```

## מודל נתונים מומלץ

`profiles`, `challenges`, `tasks`, `journal_entries`, `achievements`, `user_achievements`.
כל טבלה אישית חייבת לכלול `user_id` ומדיניות RLS שמאפשרת למשתמש לראות ולערוך רק את המידע שלו.

## פריסה

הפרויקט מוכן ל-Vercel. קובץ `vercel.json` מבטיח שכל נתיבי React Router יעבדו גם ברענון ובקישור ישיר.
