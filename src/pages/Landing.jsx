import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Compass, LineChart, MessageCircle, ShieldCheck, Sparkles, Target } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function Landing() {
  const { user } = useAuth()

  const primaryPath = user ? '/dashboard' : '/register'

  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={16} /> פיתוח ביטחון מקצועי</p>
          <h1>ביטחון מקצועי<br /><em>נבנה בצעדים קטנים.</em></h1>
          <p className="hero-lede">BoostMe הופכת את המטרות שלך לפעולות יומיות קצרות - כדי להוביל, לדבר ולהתקדם עם יותר ביטחון.</p>
          <div className="hero-actions">
            <Link to={primaryPath} className="btn btn-primary">{user ? 'לדאשבורד שלי' : 'להתחיל בחינם'} <ArrowLeft size={18} /></Link>
            {!user && <Link to="/login" className="btn btn-secondary">כבר יש לי חשבון</Link>}
          </div>
          <div className="trust-row"><span><CheckCircle2 size={16} /> 5 דקות ביום</span><span><CheckCircle2 size={16} /> ללא התחייבות</span></div>
        </div>
        <div className="product-preview" aria-label="תצוגה מקדימה של הדאשבורד">
          <div className="preview-top"><span className="preview-avatar">א</span><div><small>בוקר טוב, אופק</small><strong>ממשיכים ברצף שלך</strong></div><span className="preview-streak">🔥 7</span></div>
          <div className="preview-score"><div><small>מדד הביטחון השבועי</small><strong>78<span>/100</span></strong></div><div className="score-ring">78%</div></div>
          <div className="preview-task"><span className="task-icon"><MessageCircle size={19} /></span><div><small>האתגר הבא</small><strong>להציג את הרעיון שלך ב-60 שניות</strong><span>5 דקות · תקשורת</span></div><ArrowLeft size={18} /></div>
          <div className="preview-progress"><span>התקדמות שבועית</span><div><i /><i /><i /><i /><i className="empty" /><i className="empty" /><i className="empty" /></div></div>
        </div>
      </section>

      <section className="value-section">
        <div className="section-intro"><p className="eyebrow">לא עוד תיאוריה</p><h2>כל מה שצריך כדי לצמוח, במקום אחד.</h2><p>מסלול אישי ופרקטי שמחבר בין כוונה, פעולה והתקדמות שאפשר לראות.</p></div>
        <div className="value-grid">
          <article><span className="value-icon purple"><Target size={22} /></span><h3>אתגר ממוקד</h3><p>משימות קצרות שמותאמות למצבים המקצועיים שאתה באמת פוגש.</p></article>
          <article><span className="value-icon teal"><LineChart size={22} /></span><h3>התקדמות שמורגשת</h3><p>עקוב אחר ההרגלים, הרצף והביטחון שלך לאורך זמן.</p></article>
          <article><span className="value-icon amber"><Compass size={22} /></span><h3>כיוון ברור</h3><p>תוכן והמלצות שעוזרים לך לבחור את הצעד הנכון הבא.</p></article>
        </div>
      </section>

      <section className="steps-section"><div><p className="eyebrow">איך זה עובד</p><h2>פשוט להתחיל.<br />קל להתמיד.</h2></div><ol><li><span>01</span><div><strong>בוחרים מטרה</strong><p>נוכחות, תקשורת, מנהיגות או קידום קריירה.</p></div></li><li><span>02</span><div><strong>מבצעים אתגר קצר</strong><p>פעולה קטנה ומדויקת שאפשר לבצע כבר היום.</p></div></li><li><span>03</span><div><strong>רואים שינוי</strong><p>מתעדים, לומדים מהדרך ומחזקים את ההרגל.</p></div></li></ol></section>

      <section className="landing-cta"><ShieldCheck size={28} /><div><h2>הביטחון הבא שלך מתחיל היום.</h2><p>הצטרף למסלול אישי לפיתוח נוכחות מקצועית.</p></div><Link to={primaryPath} className="btn btn-primary">{user ? 'להמשיך במסלול' : 'יוצרים חשבון'} <ArrowLeft size={18} /></Link></section>
    </div>
  )
}

export default Landing
