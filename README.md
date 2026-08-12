# BoostMe

BoostMe היא אפליקציית React בעברית לפיתוח ביטחון מקצועי באמצעות משימות קצרות, אתגרים, מעקב התקדמות ויומן אישי. המערכת מיועדת למנהלים, עצמאים ואנשי מקצוע שרוצים להפוך מטרות מקצועיות לפעולות יומיומיות ברורות.

## קישורים

- אתר בפריסה: https://ofek-reactfinal-tqxq.vercel.app/
- Repository: https://github.com/ofek1804/ofek_reactfinal
- ERD: [docs/ERD.md](docs/ERD.md)

## יכולות עיקריות

- דף נחיתה רספונסיבי בעברית ובכיוון RTL.
- הרשמה, התחברות והגנת נתיבים.
- משתמש Admin לניהול תוכן והרשאות.
- משתמש בדיקה רגיל לבדיקת User Flow מלא.
- דאשבורד אישי עם משימות, התקדמות ופעילות אחרונה.
- ספריית אתגרים עם משימות מסוג Checklist או משימות שדורשות תוצר.
- שדה קישור/תיאור עבור משימות שדורשות קובץ, מצגת או תוצר.
- יומן אישי, הישגים, פרופיל ומעקב התקדמות.
- תמיכה בפריסת SPA ב-Vercel.

## משתמשי בדיקה

משתמש רגיל מוצג במסך הכניסה:

```text
Email: user@test.com
Password: User123!
```

משתמש Admin קיים לבדיקות הרשאה ידניות, אך אינו מוצג במסך הכניסה:

```text
Email: admin@test.com
Password: Admin123!
```

## זרימת משימות

המערכת מבחינה בין שני סוגי משימות:

- Checklist אישי: המשתמש מבצע פעולה עצמאית ומסמן שהמשימה הושלמה.
- משימה עם תוצר: המשתמש מוסיף קישור או תיאור של תוצר לפני סימון השלמה.

לדוגמה, משימת "מצגת משכנעת" כוללת קישור למצגת דמו:

```text
/assets/boostme-demo-presentation.pptx
```

## טכנולוגיות

- React 18
- Vite
- React Router
- Lucide React
- Supabase JS כהכנה לחיבור Auth ומסד נתונים
- Vercel

## התקנה והרצה מקומית

```bash
npm install
npm run dev
```

ברירת המחדל של Vite:

```text
http://127.0.0.1:5173/
```

## בניית Production

```bash
npm run build
```

להרצת תצוגת build מקומית:

```bash
npm run preview
```

## משתני סביבה

יש ליצור קובץ `.env.local` עבור חיבור Supabase אמיתי:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_EMAIL=admin@test.com
```

בגרסת הדמו הנוכחית, ההתחברות נשמרת ב-LocalStorage כדי לאפשר בדיקת Flow ללא מסד נתונים חי.

## מודל נתונים מומלץ

ה-ERD המלא נמצא בקובץ [docs/ERD.md](docs/ERD.md). המודל מתוכנן ל-Supabase וכולל:

- `profiles`
- `app_settings`
- `articles`
- `courses`
- `challenges`
- `tasks`
- `task_submissions`
- `journal_entries`
- `achievements`
- `user_achievements`

כל טבלה עם מידע אישי כוללת `user_id`, ויש להפעיל RLS כך שמשתמש רגיל יוכל לקרוא ולעדכן רק את המידע שלו. הרשאות Admin מומלץ לשמור ב-`app_metadata` או בטבלת פרופילים מאובטחת, ולא להסתמך על `user_metadata`.

## פריסה ל-Vercel

הפרויקט מוכן לפריסה ב-Vercel. הקובץ `vercel.json` מגדיר Rewrite כך שרענון בנתיבי React Router פנימיים יעבוד גם בקישור ישיר.
