# BoostMe ERD

המודל הבא מציג מבנה נתונים מומלץ עבור גרסת Supabase מלאה של BoostMe. בגרסת הדמו חלק מהמידע נשמר ב-LocalStorage, אך ה-ERD מתאים למעבר למסד נתונים אמיתי.

```mermaid
erDiagram
    AUTH_USERS ||--|| PROFILES : "has profile"
    AUTH_USERS ||--o{ TASKS : "owns custom tasks"
    AUTH_USERS ||--o{ TASK_SUBMISSIONS : "submits"
    AUTH_USERS ||--o{ JOURNAL_ENTRIES : "writes"
    AUTH_USERS ||--o{ USER_ACHIEVEMENTS : "earns"

    CHALLENGES ||--o{ TASKS : "contains"
    TASKS ||--o{ TASK_SUBMISSIONS : "has submissions"
    ACHIEVEMENTS ||--o{ USER_ACHIEVEMENTS : "awarded as"

    APP_SETTINGS ||--o{ ARTICLES : "controls content"
    APP_SETTINGS ||--o{ COURSES : "controls content"

    AUTH_USERS {
        uuid id PK
        string email
        timestamptz created_at
    }

    PROFILES {
        uuid id PK
        uuid user_id FK
        string full_name
        string role
        string company
        string title
        string bio
        string phone
        string industry
        string avatar_url
        timestamptz created_at
        timestamptz updated_at
    }

    APP_SETTINGS {
        uuid id PK
        string hero_title
        text hero_subtitle
        string hero_cta
        string hero_secondary_cta
        timestamptz updated_at
    }

    ARTICLES {
        uuid id PK
        string title
        text description
        int display_order
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    COURSES {
        uuid id PK
        string title
        text description
        numeric price
        int display_order
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    CHALLENGES {
        uuid id PK
        string title
        text description
        string category
        string difficulty
        int points
        boolean is_active
        timestamptz created_at
        timestamptz updated_at
    }

    TASKS {
        uuid id PK
        uuid user_id FK
        uuid challenge_id FK
        string title
        text caption
        string difficulty
        string proof_type
        string proof_label
        text guidance
        boolean is_template
        timestamptz created_at
        timestamptz updated_at
    }

    TASK_SUBMISSIONS {
        uuid id PK
        uuid user_id FK
        uuid task_id FK
        string proof_value
        string status
        timestamptz completed_at
        timestamptz created_at
        timestamptz updated_at
    }

    JOURNAL_ENTRIES {
        uuid id PK
        uuid user_id FK
        uuid task_submission_id FK
        string title
        text content
        int mood_score
        timestamptz created_at
        timestamptz updated_at
    }

    ACHIEVEMENTS {
        uuid id PK
        string title
        text description
        string icon
        string rule_key
        int threshold_value
        boolean is_active
        timestamptz created_at
    }

    USER_ACHIEVEMENTS {
        uuid id PK
        uuid user_id FK
        uuid achievement_id FK
        timestamptz earned_at
    }
```

## הערות מימוש

- `profiles.role` יכול להיות `admin` או `user`, אך בהרשאות רגישות מומלץ לשמור הרשאת Admin גם ב-`app_metadata`.
- `tasks.proof_type` יכול להיות `checklist`, `link` או `text`.
- `task_submissions.proof_value` שומר קישור לקובץ, קישור למצגת, או תיאור קצר של התוצר.
- `tasks.is_template=true` מתאים למשימות מערכת כלליות. משימות אישיות של משתמש יקבלו `user_id`.
- `journal_entries.task_submission_id` אופציונלי, כדי לאפשר גם כתיבת יומן כללית שאינה קשורה למשימה.
- יש להפעיל Row Level Security על כל הטבלאות ב-public schema.
- משתמש רגיל צריך לקבל גישה רק לרשומות שלו לפי `auth.uid() = user_id`.
- Admin יכול לקבל מדיניות נפרדת לניהול תוכן כמו `articles`, `courses`, `challenges` ו-`app_settings`.
