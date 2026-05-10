import React, { useState, useEffect } from 'react';
import {
  Layout,
  Trophy,
  Target,
  BarChart3,
  CheckCircle2,
  Flame,
  Settings,
  LogOut,
  Plus,
  Calendar,
  Award,
  TrendingUp,
  Star,
  Clock,
  Users,
  MessageSquare,
  X,
  Play,
  Pause,
  RotateCcw,
  User
} from 'lucide-react';

function App() {
  const [persona, setPersona] = useState(null); // 'student' or 'professional'
  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userName] = useState('אופק');
  const [streak, setStreak] = useState(3);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [level, setLevel] = useState(5);
  const [points, setPoints] = useState(247);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState('קל');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // מאגר משימות לפי פרסונה
  const [tasks, setTasks] = useState({
    student: [
      { id: 1, title: "להצביע בשיעור", desc: "להשתתף באופן פעיל בכיתה.", difficulty: 'קל', completed: false, points: 10, category: 'למידה' },
      { id: 2, title: "לשבת בשורה הראשונה", desc: "להראות נוכחות וביטחון.", difficulty: 'קל', completed: true, points: 15, category: 'ביטחון' },
      { id: 3, title: "לדבר עם חבר בכיתה", desc: "להתחיל שיחה עם מישהו שלא מכיר טוב.", difficulty: 'בינוני', completed: false, points: 20, category: 'חברתי' },
      { id: 4, title: "להעלות שאלה בדיון", desc: "להשתתף באופן אקטיבי בשיעור.", difficulty: 'בינוני', completed: true, points: 25, category: 'למידה' },
      { id: 5, title: "להציג פרויקט בכיתה", desc: "להציג את העבודה שלך מול הכיתה.", difficulty: 'קשה', completed: false, points: 35, category: 'ביטחון' }
    ],
    professional: [
      { id: 6, title: "להוביל נושא בישיבה", desc: "להפגין סמכותיות מקצועית.", difficulty: 'בינוני', completed: false, points: 25, category: 'מנהיגות' },
      { id: 7, title: "לתת פידבק לעמית", desc: "תקשורת בינאישית בונה.", difficulty: 'קל', completed: true, points: 15, category: 'חברתי' },
      { id: 8, title: "להציג רעיון חדש", desc: "לשתף רעיון בצוות ללא פחד.", difficulty: 'קשה', completed: false, points: 30, category: 'יצירתיות' },
      { id: 9, title: "לנהל ישיבה", desc: "להוביל ישיבה בצורה מקצועית.", difficulty: 'קשה', completed: true, points: 40, category: 'מנהיגות' },
      { id: 10, title: "לפנות למנהל", desc: "ליזום שיחה עם ההנהלה.", difficulty: 'בינוני', completed: false, points: 28, category: 'ביטחון' }
    ]
  });

  // אתגרים
  const [challenges] = useState([
    { id: 1, title: "שבוע ללא פחד", desc: "השלם 7 משימות ברציפות", difficulty: 'בינוני', completed: false, reward: 50, daysLeft: 3 },
    { id: 2, title: "מומחה חברתי", desc: "התחל 10 שיחות עם אנשים חדשים", difficulty: 'קשה', completed: true, reward: 75, daysLeft: 0 },
    { id: 3, title: "מנהיג הכיתה", desc: "הובל לפחות 3 דיונים בכיתה", difficulty: 'קשה', completed: false, reward: 100, daysLeft: 7 },
    { id: 4, title: "מאסטר הצגות", desc: "הצג 5 פרויקטים מול קהל", difficulty: 'קשה', completed: false, reward: 120, daysLeft: 14 }
  ]);

  // נתוני התקדמות שבועית
  const [progressData] = useState([
    { day: 'א', completed: 3, total: 4 },
    { day: 'ב', completed: 4, total: 4 },
    { day: 'ג', completed: 2, total: 4 },
    { day: 'ד', completed: 4, total: 4 },
    { day: 'ה', completed: 3, total: 4 },
    { day: 'ו', completed: 1, total: 4 },
    { day: 'ש', completed: 2, total: 4 }
  ]);

  // הישגים
  const [achievements, setAchievements] = useState([
    { id: 1, name: 'מתחיל', icon: '🔥', unlocked: true, desc: 'השלמת המשימה הראשונה' },
    { id: 2, name: 'נקודה ראשונה', icon: '⭐', unlocked: true, desc: 'צברת 10 נקודות' },
    { id: 3, name: 'דקוק', icon: '🎯', unlocked: true, desc: 'השלמת 10 משימות' },
    { id: 4, name: 'רצף ראשון', icon: '🔥', unlocked: true, desc: '3 ימי רצף' },
    { id: 5, name: 'מומחה', icon: '👑', unlocked: false, desc: 'השלמת 50 משימות' },
    { id: 6, name: 'אגדה', icon: '🌟', unlocked: false, desc: 'השלמת 100 משימות' },
    { id: 7, name: 'חברתי', icon: '👥', unlocked: false, desc: 'השלמת 5 משימות חברתיות' },
    { id: 8, name: 'מנהיג', icon: '🎖️', unlocked: false, desc: 'השלמת 3 משימות מנהיגות' }
  ]);

  // תזכורות יומיות
  const [dailyReminders, setDailyReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');

  // פידבק חיובי מותאם אישית
  const getPersonalizedFeedback = () => {
    const completedToday = tasks[persona]?.filter(task => task.completed).length || 0;
    const totalToday = tasks[persona]?.length || 0;

    if (completedToday === 0) {
      return "כל התחלה קשה קצת, אבל אתה מסוגל! בוא נתחיל במשימה קטנה היום 🚀";
    } else if (completedToday < totalToday / 2) {
      return "אתה מתקדם יפה! כל משימה קטנה היא צעד גדול בבניית הביטחון שלך 💪";
    } else if (completedToday === totalToday) {
      return "מדהים! השלמת את כל המשימות היום! אתה בדרך להיות גרסה טובה יותר של עצמך! 🎉";
    } else {
      return "מעולה! אתה ממשיך להתקדם. המשימה הבאה תהיה קלה יותר עכשיו 📈";
    }
  };

  // עדכון הישגים אוטומטי
  useEffect(() => {
    const newAchievements = [...achievements];

    // הישג משימות חברתיות
    const socialTasksCompleted = tasks[persona]?.filter(task =>
      task.category === 'חברתי' && task.completed
    ).length || 0;
    if (socialTasksCompleted >= 5 && !newAchievements[6].unlocked) {
      newAchievements[6].unlocked = true;
    }

    // הישג משימות מנהיגות
    const leadershipTasksCompleted = tasks[persona]?.filter(task =>
      task.category === 'מנהיגות' && task.completed
    ).length || 0;
    if (leadershipTasksCompleted >= 3 && !newAchievements[7].unlocked) {
      newAchievements[7].unlocked = true;
    }

    // הישג מומחה (50 משימות)
    if (completedTasks >= 50 && !newAchievements[4].unlocked) {
      newAchievements[4].unlocked = true;
    }

    // הישג אגדה (100 משימות)
    if (completedTasks >= 100 && !newAchievements[5].unlocked) {
      newAchievements[5].unlocked = true;
    }

    setAchievements(newAchievements);
  }, [completedTasks, tasks, persona]);

  // טיימר
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // מסך בחירה אם לא נבחרה פרסונה
  if (!persona) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '20px',
        backgroundColor: 'var(--bg-color)',
        fontFamily: 'Segoe UI, sans-serif',
        direction: 'rtl'
      }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '32px', marginBottom: '10px' }}>BoostMe</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '30px' }}>
          אפליקציית ביטחון עצמי
        </p>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>היכנס לאפליקציה</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => setPersona('student')}
            className="persona-btn"
            style={{
              padding: '15px 40px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
            }}
          >
            היכנס
          </button>
        </div>
      </div>
    );
  }

  // פונקציות עזר
  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      const personaTasks = newTasks[persona];
      const taskIndex = personaTasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        const task = personaTasks[taskIndex];
        const wasCompleted = task.completed;
        task.completed = !task.completed;

        // עדכון נקודות ורמה
        if (!wasCompleted && task.completed) {
          setPoints(prev => prev + task.points);
          setCompletedTasks(prev => prev + 1);
          // רמה עולה כל 50 נקודות
          if ((points + task.points) % 50 === 0) {
            setLevel(prev => prev + 1);
          }
        } else if (wasCompleted && !task.completed) {
          setPoints(prev => prev - task.points);
          setCompletedTasks(prev => prev - 1);
        }
      }

      return newTasks;
    });
  };

  const deleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        newTasks[persona] = newTasks[persona].filter(task => task.id !== taskToDelete);
        return newTasks;
      });
    }
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      desc: newTaskDesc,
      difficulty: newTaskDifficulty,
      completed: false,
      points: newTaskDifficulty === 'קל' ? 10 : newTaskDifficulty === 'בינוני' ? 20 : 30,
      category: 'אישי'
    };

    setTasks(prevTasks => ({
      ...prevTasks,
      [persona]: [...prevTasks[persona], newTask]
    }));

    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDifficulty('קל');
    setShowAddTaskModal(false);
  };

  const toggleChallenge = (challengeId) => {
    // Implementation for challenge completion
    console.log('Toggle challenge:', challengeId);
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'קל': return '#4CAF50';
      case 'בינוני': return '#FF9800';
      case 'קשה': return '#F44336';
      default: return '#666';
    }
  };

  // רינדור התוכן הראשי
  const renderDashboard = () => {
    const personaTasks = tasks[persona] || [];
    const totalTasks = personaTasks.length;
    const completedCount = personaTasks.filter(task => task.completed).length;
    const totalProgress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
    const uncompletedTasks = personaTasks.filter(task => !task.completed);
    const completedTasksToday = personaTasks.filter(task => task.completed);

    return (
      <>
        <header className="page-header">
          <div>
            <h1>היי {userName}, מוכן לבוסט של היום? 🚀</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              {new Date().toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="streak-badge" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fff3e0',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid #ff9800'
          }}>
            <Flame size={28} fill="#ff5722" color="#ff5722" />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff5722' }}>
                {streak} ימי רצף! 🔥
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                המשך ככה וזה גדל עוד
              </div>
            </div>
          </div>
        </header>

        {/* פידבק מותאם אישית */}
        <div className="feedback-card">
          <div className="feedback-content">
            <MessageSquare size={24} />
            <p>{getPersonalizedFeedback()}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon level">LV</div>
            <div className="stat-content">
              <h3>רמה</h3>
              <p className="stat-value">{level}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {Math.round((points % 50) / 50 * 100)}% עד הרמה הבאה
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon points">⭐</div>
            <div className="stat-content">
              <h3>נקודות</h3>
              <p className="stat-value">{points}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {Math.round((points / 300) * 100)}% עד פרס
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon trophy">🏆</div>
            <div className="stat-content">
              <h3>הישגים</h3>
              <p className="stat-value">{achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}% בוצע
              </p>
            </div>
          </div>
        </div>

        {/* התקדמות יומית */}
        <div className="progress-section">
          <h2>ההתקדמות היומית שלך</h2>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="progress-text" style={{ fontSize: '16px', fontWeight: '600' }}>
              {completedCount} מתוך {totalTasks} משימות הושלמו ({totalProgress}%)
            </p>
          </div>
        </div>

        {/* משימות הנוכחיות */}
        {uncompletedTasks.length > 0 && (
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">🎯 המשימות שלך להיום</h2>
                <p className="card-subtitle">{uncompletedTasks.length} משימות ממתינות</p>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowAddTaskModal(true)}
              >
                <Plus size={16} />
                הוסף משימה
              </button>
            </div>
            <div className="task-grid">
              {uncompletedTasks.slice(0, 6).map(task => (
                <div
                  key={task.id}
                  className="task-card"
                  onClick={() => openTaskModal(task)}
                >
                  <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span
                        className="task-difficulty"
                        style={{
                          backgroundColor: getDifficultyColor(task.difficulty) + '20',
                          color: getDifficultyColor(task.difficulty)
                        }}
                      >
                        {task.difficulty}
                      </span>
                      <button
                        className="btn btn-danger btn-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                        style={{ padding: '4px 8px' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="task-description">{task.desc}</p>
                  <div className="task-meta">
                    <span><Star size={14} /> {task.points} נקודות</span>
                    <span className="task-category">{task.category}</span>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTaskCompletion(task.id);
                      }}
                    >
                      <CheckCircle2 size={14} />
                      בואו נתחיל!
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {uncompletedTasks.length > 6 && (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '16px' }}>
                ועוד {uncompletedTasks.length - 6} משימות...
              </p>
            )}
          </div>
        )}

        {/* משימות שהושלמו */}
        {completedTasksToday.length > 0 && (
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">✅ המשימות שהושלמו היום</h2>
                <p className="card-subtitle">{completedTasksToday.length} משימות</p>
              </div>
            </div>
            <div className="task-grid">
              {completedTasksToday.map(task => (
                <div
                  key={task.id}
                  className="task-card completed"
                  onClick={() => openTaskModal(task)}
                  style={{ opacity: 0.8, position: 'relative' }}
                >
                  <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="task-difficulty"
                        style={{
                          backgroundColor: getDifficultyColor(task.difficulty) + '20',
                          color: getDifficultyColor(task.difficulty)
                        }}
                      >
                        {task.difficulty}
                      </span>
                      <button
                        className="btn btn-danger btn-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                        style={{ padding: '4px 8px' }}
                        title="מחק משימה"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="task-description">{task.desc}</p>
                  <div className="task-meta">
                    <span><Star size={14} /> +{task.points} נקודות</span>
                    <span className="task-category">{task.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* אם אין משימות כלל */}
        {totalTasks === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <Target size={48} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
            <h2>אין משימות עדיין</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              בואו נתחילו! הוסיפו משימה חדשה כדי להתחיל את הזמש הטוב שלכם
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddTaskModal(true)}
            >
              <Plus size={16} />
              הוסף משימה ראשונה
            </button>
          </div>
        )}
      </>
    );
  };

  const renderChallenges = () => (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">אתגרים מיוחדים 🎯</h2>
      </div>
      <div className="challenges-list">
        {challenges.map(challenge => (
          <div key={challenge.id} className={`challenge-card ${challenge.completed ? 'completed' : ''}`}>
            <div className="challenge-header">
              <h3>{challenge.title}</h3>
              <div className="challenge-reward">
                <Trophy size={20} />
                <span>+{challenge.reward}</span>
              </div>
            </div>
            <p className="challenge-description">{challenge.desc}</p>
            <div className="challenge-footer">
              <div className="challenge-meta">
                <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
                  {challenge.difficulty}
                </span>
                <span className="days-left">🕐 {challenge.daysLeft} ימים נותרו</span>
              </div>
              <button
                className={`btn ${challenge.completed ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                onClick={() => toggleChallenge(challenge.id)}
              >
                {challenge.completed ? '✓ בוצע' : 'קבלת האתגר'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProgress = () => {
    const totalCompleted = progressData.reduce((sum, day) => sum + day.completed, 0);
    const totalPossible = progressData.reduce((sum, day) => sum + day.total, 0);
    const totalProgress = Math.round((totalCompleted / totalPossible) * 100);
    const personaTasks = tasks[persona] || [];
    const completedCount = personaTasks.filter(task => task.completed).length;

    return (
      <>
        <header className="page-header">
          <h1>התקדמות שלך 📊</h1>
          <p style={{ color: 'var(--text-secondary)' }}>ניתוח הביצוע שלך</p>
        </header>

        {/* סטטיסטיקות כלליות */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
          <div className="stat-card">
            <div className="stat-icon level">📈</div>
            <div className="stat-content">
              <h3>התקדמות כללית</h3>
              <p className="stat-value">{totalProgress}%</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon points">✅</div>
            <div className="stat-content">
              <h3>משימות היום</h3>
              <p className="stat-value">{completedCount}/{personaTasks.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon trophy">🔥</div>
            <div className="stat-content">
              <h3>רצף ימים</h3>
              <p className="stat-value">{streak}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon level">🎯</div>
            <div className="stat-content">
              <h3>אתגרים בוצעו</h3>
              <p className="stat-value">{challenges.filter(c => c.completed).length}/{challenges.length}</p>
            </div>
          </div>
        </div>

        {/* התקדמות כללית */}
        <div className="overview-card">
          <h2>🎯 התקדמות כללית</h2>
          <div className="big-progress-bar">
            <div className="big-progress-fill" style={{ width: `${totalProgress}%` }}></div>
          </div>
          <p style={{ fontSize: '16px', fontWeight: '600', marginTop: '12px' }}>
            {totalCompleted} מתוך {totalPossible} משימות שהושלמו ({totalProgress}%)
          </p>
        </div>

        {/* סטטיסטיקות שבועיות */}
        <div className="weekly-stats">
          <h2>📅 סטטיסטיקות שבועיות</h2>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: 'var(--text-secondary)' }}>התקדמות יומית בימים האחרונים</p>
          </div>
          <div className="weekly-chart">
            {progressData.map((day, index) => (
              <div key={index} className="day-column">
                <div className="day-bar">
                  <div
                    className="day-fill"
                    style={{ height: `${(day.completed / day.total) * 100}%` }}
                    title={`${day.completed}/${day.total}`}
                  ></div>
                </div>
                <label style={{ fontWeight: '600', fontSize: '14px', marginTop: '8px' }}>{day.day}</label>
                <span className="day-count">{day.completed}/{day.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* הישגים */}
        <div className="achievements">
          <h2>🏆 הישגים</h2>
          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div key={achievement.id} className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                <span className="achievement-icon">{achievement.icon}</span>
                <span className="achievement-name">{achievement.name}</span>
                <span className="achievement-desc">{achievement.desc}</span>
                {achievement.unlocked && <span style={{ marginTop: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>✓ בוצע</span>}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderProfile = () => (
    <>
      <header className="page-header">
        <h1>הפרופיל שלך 👤</h1>
      </header>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-placeholder">{userName.charAt(0)}</div>
          </div>
          <h2>{userName}</h2>
          <p className="member-since">חברה מאז: יוני 2024</p>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <label>משימות שהושלמו</label>
            <span className="stat-number">{completedTasks}</span>
          </div>
          <div className="stat-item">
            <label>ימי רצף</label>
            <span className="stat-number">{streak}</span>
          </div>
          <div className="stat-item">
            <label>נקודות כוללות</label>
            <span className="stat-number">{points}</span>
          </div>
          <div className="stat-item">
            <label>אתגרים שהושלמו</label>
            <span className="stat-number">{challenges.filter(c => c.completed).length}</span>
          </div>
        </div>

        <div className="profile-section">
          <h3>על הפרופיל שלך</h3>
          <div className="profile-info">
            <p><strong>שם:</strong> {userName}</p>
            <p><strong>סוג משתמש:</strong> {persona === 'student' ? 'תלמיד' : 'מקצועי'}</p>
            <p><strong>עמידה בתרגילים:</strong> יומית</p>
            <p><strong>ממוקד:</strong> חברתי וביטחון עצמי</p>
          </div>
        </div>

        <div className="profile-section preferences">
          <h3>העדפות והגדרות</h3>
          <div className="preference-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={dailyReminders}
                onChange={(e) => setDailyReminders(e.target.checked)}
              />
              <span>קבל תזכורות יומיות</span>
            </div>
          </div>
          {dailyReminders && (
            <div className="preference-item">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} />
                <span>שעת תזכורת:</span>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  style={{ marginRight: '8px' }}
                />
              </label>
            </div>
          )}
          <div className="preference-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" defaultChecked />
              <span>הראה הודעות הצלחה</span>
            </div>
          </div>
          <div className="preference-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" />
              <span>שתף התקדמות ברשתות חברתיות</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderSettings = () => (
    <>
      <header className="page-header">
        <h1>הגדרות האפליקציה ⚙️</h1>
      </header>

      <div className="settings-content">
        <div className="settings-section">
          <h3>תזכורות יומיות</h3>
          <div className="setting-item">
            <div className="setting-control">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={dailyReminders}
                  onChange={(e) => setDailyReminders(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
              <span>הפעל תזכורות יומיות</span>
            </div>
          </div>

          {dailyReminders && (
            <div className="setting-item">
              <label>שעת תזכורת יומית:</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="time-input"
              />
            </div>
          )}
        </div>

        <div className="settings-section">
          <h3>העדפות התראות</h3>
          <div className="setting-item">
            <div className="setting-control">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
              <span>הראה הודעות הצלחה</span>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-control">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <span>הודעות קוליות</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>פרטיות ושיתוף</h3>
          <div className="setting-item">
            <div className="setting-control">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <span>שתף התקדמות ברשתות חברתיות</span>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-control">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
              <span>איסוף נתונים אנונימי לשיפור האפליקציה</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>איפוס נתונים</h3>
          <p className="warning-text">פעולות אלו לא ניתנות לביטול</p>
          <button className="btn btn-warning">
            איפוס התקדמות יומית
          </button>
          <button className="btn btn-danger" style={{ marginRight: '10px' }}>
            איפוס כל הנתונים
          </button>
        </div>
      </div>
    </>
  );

  const renderTaskModal = () => {
    if (!showTaskModal || !selectedTask) return null;

    return (
      <div className="modal-overlay" onClick={closeTaskModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{selectedTask.title}</h2>
            <button className="modal-close" onClick={closeTaskModal}>
              <X size={24} />
            </button>
          </div>

          <div className="form-group">
            <label>תיאור</label>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>
              {selectedTask.desc}
            </p>
          </div>

          <div className="form-group">
            <label>קטגוריה</label>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              {selectedTask.category}
            </p>
          </div>

          <div className="form-group">
            <label>רמת קושי</label>
            <span
              className="task-difficulty"
              style={{
                backgroundColor: getDifficultyColor(selectedTask.difficulty) + '20',
                color: getDifficultyColor(selectedTask.difficulty),
                padding: '8px 16px',
                borderRadius: '12px',
                display: 'inline-block',
                fontWeight: '600'
              }}
            >
              {selectedTask.difficulty}
            </span>
          </div>

          <div className="form-group">
            <label>נקודות</label>
            <p style={{ color: 'var(--primary)', fontSize: '24px', fontWeight: 'bold' }}>
              ⭐ {selectedTask.points} נקודות
            </p>
          </div>

          {/* טיימר */}
          <div className="form-group" style={{
            backgroundColor: 'var(--bg-light)',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <label style={{ display: 'block', marginBottom: '12px' }}>⏱️ טיימר</label>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'var(--primary)',
              marginBottom: '12px',
              fontFamily: 'monospace'
            }}>
              {formatTime(timer)}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                className={`btn ${isTimerRunning ? 'btn-danger' : 'btn-success'} btn-sm`}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
              >
                {isTimerRunning ? (
                  <>
                    <Pause size={14} />
                    עצור
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    התחל
                  </>
                )}
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setTimer(0);
                  setIsTimerRunning(false);
                }}
              >
                <RotateCcw size={14} />
                איפוס
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={closeTaskModal}>
              סגור
            </button>
            <button
              className={`btn ${selectedTask.completed ? 'btn-secondary' : 'btn-success'}`}
              onClick={() => {
                toggleTaskCompletion(selectedTask.id);
                setTimer(0);
                setIsTimerRunning(false);
                closeTaskModal();
              }}
            >
              <CheckCircle2 size={16} />
              {selectedTask.completed ? 'בטל השלמה' : 'סמן כהושלם'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAddTaskModal = () => {
    if (!showAddTaskModal) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowAddTaskModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">הוסף משימה חדשה</h2>
            <button className="modal-close" onClick={() => setShowAddTaskModal(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="form-group">
            <label>כותרת המשימה</label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="הכנס כותרת למשימה..."
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>תיאור המשימה</label>
            <textarea
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              placeholder="הכנס תיאור מפורט..."
              className="form-textarea"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>רמת קושי</label>
            <select
              value={newTaskDifficulty}
              onChange={(e) => setNewTaskDifficulty(e.target.value)}
              className="form-select"
            >
              <option value="קל">קל</option>
              <option value="בינוני">בינוני</option>
              <option value="קשה">קשה</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={() => setShowAddTaskModal(false)}>
              ביטול
            </button>
            <button className="btn btn-primary" onClick={addTask}>
              הוסף משימה
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>BoostMe</h1>
          <p>אפליקציית ביטחון עצמי</p>
        </div>

        <nav className="nav">
          <div
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <Layout size={20} />
            <span>דאשבורד</span>
          </div>
          <div
            className={`nav-item ${currentPage === 'challenges' ? 'active' : ''}`}
            onClick={() => setCurrentPage('challenges')}
          >
            <Target size={20} />
            <span>אתגרים</span>
          </div>
          <div
            className={`nav-item ${currentPage === 'progress' ? 'active' : ''}`}
            onClick={() => setCurrentPage('progress')}
          >
            <BarChart3 size={20} />
            <span>התקדמות</span>
          </div>
          <div
            className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentPage('profile')}
          >
            <User size={20} />
            <span>פרופיל</span>
          </div>
          <div
            className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentPage('settings')}
          >
            <Settings size={20} />
            <span>הגדרות</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => setPersona(null)}>
            <Settings size={20} />
            <span>הגדרות</span>
          </button>
          <button className="nav-item logout" onClick={() => setPersona(null)}>
            <LogOut size={20} />
            <span>התנתקות</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'challenges' && renderChallenges()}
        {currentPage === 'progress' && renderProgress()}
        {currentPage === 'profile' && renderProfile()}
        {currentPage === 'settings' && renderSettings()}
      </main>

      {/* Modals */}
      {renderTaskModal()}
      {renderAddTaskModal()}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">⚠️ מחק משימה</h2>
              <button className="modal-close" onClick={cancelDelete}>
                <X size={24} />
              </button>
            </div>

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                האם אתה בטוח שברצונך למחוק משימה זו?
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: 'var(--error)', 
                marginTop: '12px',
                fontWeight: '600'
              }}>
                פעולה זו לא ניתנת לביטול!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={cancelDelete}>
                ביטול
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                <X size={16} />
                כן, מחק
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
