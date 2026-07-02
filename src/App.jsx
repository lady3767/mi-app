import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0612",
  bgCard: "#120e1f",
  bgCard2: "#1a1430",
  accent: "#9b6dff",
  accentLight: "#c4a0ff",
  accentDark: "#6a3fcf",
  gold: "#f0c060",
  goldLight: "#ffd98a",
  teal: "#40e0c0",
  pink: "#ff6eb0",
  text: "#f0eaff",
  textMuted: "#9988bb",
  border: "#2a2050",
  success: "#4ecb71",
};

const courses = [
  {
    id: 1,
    title: "Kundalini Awakening",
    subtitle: "Activate Your Vital Energy",
    icon: "🔥",
    color: "#ff6b35",
    colorEnd: "#ff2d78",
    lessons: 12,
    duration: "4h 30m",
    level: "Beginner",
    rating: 4.9,
    description:
      "Unlock the dormant energy at the base of your spine through guided breathwork, movement, and meditation. A safe, structured journey to expand consciousness.",
    tags: ["Energy Work", "Breathwork", "Meditation"],
    chapters: [
      { title: "Introduction to Kundalini", duration: "18:00", free: true },
      { title: "Root Chakra Activation", duration: "22:00", free: false },
      { title: "Sacral Energy Flow", duration: "25:00", free: false },
      { title: "Solar Plexus Power", duration: "20:00", free: false },
      { title: "Heart Opening Ceremony", duration: "28:00", free: false },
      { title: "Throat Chakra Expression", duration: "19:00", free: false },
    ],
  },
  {
    id: 2,
    title: "High Vibration Living",
    subtitle: "Transform Your Frequency",
    icon: "✨",
    color: "#9b6dff",
    colorEnd: "#40e0c0",
    lessons: 10,
    duration: "3h 45m",
    level: "All Levels",
    rating: 4.8,
    description:
      "Shift your mindset, habits, and energy field to align with higher frequencies. Learn practical tools to sustain joy, clarity, and abundance daily.",
    tags: ["Mindset", "Frequency", "Manifestation"],
    chapters: [
      { title: "Understanding Vibration", duration: "15:00", free: true },
      { title: "Morning Frequency Rituals", duration: "20:00", free: false },
      { title: "Clearing Low Energy Patterns", duration: "23:00", free: false },
      { title: "Abundance Activation", duration: "25:00", free: false },
      { title: "High Vibe Relationships", duration: "22:00", free: false },
    ],
  },
  {
    id: 3,
    title: "Deep Sleep Journey",
    subtitle: "Rest & Truly Renew",
    icon: "🌙",
    color: "#1a78ff",
    colorEnd: "#9b6dff",
    lessons: 8,
    duration: "2h 50m",
    level: "Beginner",
    rating: 4.9,
    description:
      "Fall asleep faster and wake up genuinely restored. Combines sound healing frequencies, guided visualization, and body scan techniques for restorative sleep.",
    tags: ["Sleep", "Sound Healing", "Relaxation"],
    chapters: [
      { title: "The Science of Deep Sleep", duration: "12:00", free: true },
      { title: "Body Scan Release", duration: "18:00", free: false },
      { title: "432Hz Sleep Soundscape", duration: "30:00", free: false },
      { title: "Dream Journaling Practice", duration: "15:00", free: false },
    ],
  },
  {
    id: 4,
    title: "Chakra Balancing",
    subtitle: "Align Your Energy Centers",
    icon: "🌈",
    color: "#f0c060",
    colorEnd: "#ff6b35",
    lessons: 14,
    duration: "5h 10m",
    level: "Intermediate",
    rating: 4.7,
    description:
      "A comprehensive guide to the 7 chakra system. Identify blockages, activate each center, and maintain an open, flowing energy body for optimal health.",
    tags: ["Chakras", "Energy Healing", "Balance"],
    chapters: [
      { title: "Chakra System Overview", duration: "20:00", free: true },
      { title: "Root — Muladhara", duration: "22:00", free: false },
      { title: "Sacral — Svadhisthana", duration: "22:00", free: false },
      { title: "Solar Plexus — Manipura", duration: "22:00", free: false },
      { title: "Heart — Anahata", duration: "25:00", free: false },
      { title: "Throat — Vishuddha", duration: "20:00", free: false },
      { title: "Third Eye — Ajna", duration: "25:00", free: false },
    ],
  },
  {
    id: 5,
    title: "Inner Child Healing",
    subtitle: "Reconnect & Restore",
    icon: "💛",
    color: "#f0c060",
    colorEnd: "#ff6eb0",
    lessons: 9,
    duration: "3h 20m",
    level: "All Levels",
    rating: 4.8,
    description:
      "Gently meet and heal the wounded parts of your past. This course uses somatic practices, journaling, and meditation to reparent your inner child with compassion.",
    tags: ["Healing", "Inner Work", "Somatic"],
    chapters: [
      { title: "Meeting Your Inner Child", duration: "20:00", free: true },
      { title: "Identifying Core Wounds", duration: "22:00", free: false },
      { title: "Somatic Release Practice", duration: "25:00", free: false },
      { title: "Reparenting Meditation", duration: "28:00", free: false },
    ],
  },
];

const rituals = [
  {
    id: 1,
    title: "Morning Awakening",
    duration: "10 min",
    icon: "🌅",
    color: "#f0c060",
    colorEnd: "#ff6b35",
    type: "Breathwork + Intention",
    sound: "528Hz — Love Frequency",
    description:
      "Start your day with clarity and intention. A gentle breathwork sequence followed by a visualization to set the tone for a high-vibration day.",
  },
  {
    id: 2,
    title: "Midday Reset",
    duration: "7 min",
    icon: "☀️",
    color: "#40e0c0",
    colorEnd: "#1a78ff",
    type: "Grounding + Release",
    sound: "432Hz — Healing Frequency",
    description:
      "A quick energy reset to release tension and recenter yourself. Perfect for a work break or moment of overwhelm.",
  },
  {
    id: 3,
    title: "Evening Wind Down",
    duration: "15 min",
    icon: "🌙",
    color: "#9b6dff",
    colorEnd: "#1a78ff",
    type: "Body Scan + Release",
    sound: "174Hz — Foundation Frequency",
    description:
      "Release the energy of the day and prepare your body and mind for deep, restorative sleep with a gentle somatic body scan.",
  },
  {
    id: 4,
    title: "Heart Opening",
    duration: "12 min",
    icon: "💚",
    color: "#4ecb71",
    colorEnd: "#40e0c0",
    type: "Meditation + Sound",
    sound: "639Hz — Connection Frequency",
    description:
      "Soften the heart center and cultivate self-love, compassion, and openness with guided meditation and heart-expanding breathwork.",
  },
  {
    id: 5,
    title: "Energy Cleanse",
    duration: "8 min",
    icon: "🔮",
    color: "#ff6eb0",
    colorEnd: "#9b6dff",
    type: "Visualization + Sound",
    sound: "396Hz — Liberation Frequency",
    description:
      "Clear stagnant or negative energy from your field with a powerful visualization ritual and sound healing frequencies.",
  },
  {
    id: 6,
    title: "Gratitude Practice",
    duration: "10 min",
    icon: "🙏",
    color: "#f0c060",
    colorEnd: "#4ecb71",
    type: "Journaling + Meditation",
    sound: "963Hz — Crown Frequency",
    description:
      "Anchor into abundance and shift your frequency with a structured gratitude meditation and journaling practice.",
  },
];

const chatMessages = [
  {
    role: "assistant",
    text: "Hello, and welcome 🙏 I'm your spiritual guide on this journey. What's present for you right now — what are you seeking today?",
  },
];

const quickReplies = [
  "I feel stressed and overwhelmed",
  "I want to explore Kundalini",
  "Help me sleep better",
  "What practice should I start with?",
  "I'm feeling disconnected",
  "Guide me through breathwork",
];

const aiResponses = {
  stress:
    "I hear you — stress can feel so heavy. Let's start simple: place one hand on your chest, one on your belly. Take 3 slow breaths with me. In for 4... hold for 4... out for 6. You're already doing the work just by being here. ✨ I'd suggest our **Evening Wind Down** ritual or the **High Vibration Living** course to help shift this pattern gently.",
  kundalini:
    "What a powerful path to explore 🔥 Kundalini energy is your life force — it's the fire that ignites true awakening. Our **Kundalini Awakening** course is the perfect starting point. It's guided, safe, and builds gradually. Are you drawn to the physical or energetic aspects of this work?",
  sleep:
    "Sleep is sacred — it's when your soul processes and integrates. 🌙 Many of us carry the day's stress into our nights. I'd suggest starting with our **Deep Sleep Journey** course. The 432Hz soundscapes are especially powerful for quieting a busy mind. Would you like to try the Evening Wind Down ritual right now?",
  practice:
    "For most people stepping onto this path, I suggest starting with the **Morning Awakening** ritual — just 10 minutes to anchor your intention for the day. From there, the **High Vibration Living** course gives you a beautiful foundation. What feels most aligned for you — morning or evening?",
  disconnected:
    "That feeling of disconnection is actually the soul's call to return home. 💛 It's a sign you're ready for something deeper. The **Inner Child Healing** course is profoundly transformative for this. Also, our **Heart Opening** ritual can create an immediate shift. You are not lost — you're being guided.",
  breathwork:
    "Beautiful — let's do this together. 🌬️ Try the 4-7-8 technique: **Inhale** through your nose for **4 counts**... **Hold** your breath for **7 counts**... **Exhale** slowly through your mouth for **8 counts**. Repeat 4 times. Notice how your nervous system shifts. This is the gateway to all other practices. How do you feel?",
};

function getAIResponse(text) {
  const t = text.toLowerCase();
  if (t.includes("stress") || t.includes("overwhelm") || t.includes("anxious") || t.includes("anxiet")) return aiResponses.stress;
  if (t.includes("kundalini") || t.includes("energy") || t.includes("chakra")) return aiResponses.kundalini;
  if (t.includes("sleep") || t.includes("rest") || t.includes("tired") || t.includes("insomn")) return aiResponses.sleep;
  if (t.includes("start") || t.includes("begin") || t.includes("practice") || t.includes("suggest")) return aiResponses.practice;
  if (t.includes("disconnect") || t.includes("lost") || t.includes("numb") || t.includes("empty")) return aiResponses.disconnected;
  if (t.includes("breath") || t.includes("breathwork")) return aiResponses.breathwork;
  return "Thank you for sharing that with me 🙏 The path you're walking is deeply personal. Whatever brought you here today — a restlessness, a longing, a spark — trust it. Every journey inward begins with exactly this moment. Would you like me to recommend a practice or course that might speak to where you are right now?";
}

const userProgress = [
  { course: "Kundalini Awakening", progress: 33, lessonsComplete: 2, total: 6 },
  { course: "High Vibration Living", progress: 20, lessonsComplete: 1, total: 5 },
  { course: "Morning Awakening", progress: 100, lessonsComplete: 1, total: 1, isRitual: true },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedRitual, setSelectedRitual] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [ritualActive, setRitualActive] = useState(false);
  const [ritualProgress, setRitualProgress] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [showPremium, setShowPremium] = useState(false);
  const chatEndRef = useRef(null);
  const playInterval = useRef(null);
  const ritualInterval = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isPlaying) {
      playInterval.current = setInterval(() => {
        setPlayProgress((p) => {
          if (p >= 100) {
            clearInterval(playInterval.current);
            setIsPlaying(false);
            return 100;
          }
          return p + 0.5;
        });
      }, 150);
    } else {
      clearInterval(playInterval.current);
    }
    return () => clearInterval(playInterval.current);
  }, [isPlaying]);

  useEffect(() => {
    if (ritualActive) {
      ritualInterval.current = setInterval(() => {
        setRitualProgress((p) => {
          if (p >= 100) {
            clearInterval(ritualInterval.current);
            setRitualActive(false);
            return 100;
          }
          return p + 0.2;
        });
      }, 100);
    } else {
      clearInterval(ritualInterval.current);
    }
    return () => clearInterval(ritualInterval.current);
  }, [ritualActive]);

  const sendMessage = (text) => {
    const msg = text || chatInput;
    if (!msg.trim()) return;
    setMessages((m) => [...m, { role: "user", text: msg }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { role: "assistant", text: getAIResponse(msg) }]);
    }, 1500 + Math.random() * 1000);
  };

  const goals = [
    { label: "Reduce Stress", icon: "🧘" },
    { label: "Better Sleep", icon: "🌙" },
    { label: "Spiritual Growth", icon: "✨" },
    { label: "Kundalini Awakening", icon: "🔥" },
    { label: "Emotional Healing", icon: "💛" },
    { label: "Raise My Vibration", icon: "⚡" },
  ];

  const toggleGoal = (g) => {
    setSelectedGoals((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);
  };

  const onboardingSteps = [
    {
      title: "Welcome to PTA",
      subtitle: "Personal Transformation App",
      body: "Combining ancient wisdom with modern technology to support your spiritual and personal growth.",
      cta: "Begin Your Journey",
      image: "🌟",
    },
    {
      title: "What are you seeking?",
      subtitle: "Choose your intentions",
      body: "Select the areas that call to you most. You can always explore all paths.",
      cta: "Continue",
      isGoals: true,
    },
    {
      title: "Your Path Awaits",
      subtitle: "Personalized just for you",
      body: "Based on your intentions, we've curated courses, rituals, and practices to guide your journey.",
      cta: "Enter the App",
      image: "🙏",
    },
  ];

  if (showOnboarding) {
    const step = onboardingSteps[onboardingStep];
    return (
      <div style={styles.root}>
        <div style={styles.onboarding}>
          <div style={{ ...styles.onboardingBg, background: `radial-gradient(ellipse at 50% 30%, #9b6dff33 0%, transparent 70%), radial-gradient(ellipse at 80% 80%, #40e0c033 0%, transparent 60%), ${COLORS.bg}` }} />
          <div style={styles.onboardingContent}>
            {onboardingStep === 0 && (
              <>
                <div style={styles.onboardingLogoWrap}>
                  <div style={styles.onboardingLogo}>PTA</div>
                </div>
                <div style={styles.onboardingEmoji}>{step.image}</div>
                <h1 style={styles.onboardingTitle}>{step.title}</h1>
                <p style={styles.onboardingSubtitle}>{step.subtitle}</p>
                <p style={styles.onboardingBody}>{step.body}</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
                  {["Kundalini 🔥", "Sound Healing 🎵", "Meditation 🧘", "Rituals 🕯️"].map((t) => (
                    <span key={t} style={styles.tag}>{t}</span>
                  ))}
                </div>
              </>
            )}
            {onboardingStep === 1 && (
              <>
                <div style={{ marginBottom: 8, fontSize: 40 }}>🎯</div>
                <h1 style={styles.onboardingTitle}>{step.title}</h1>
                <p style={styles.onboardingBody}>{step.body}</p>
                <div style={styles.goalsGrid}>
                  {goals.map((g) => (
                    <button
                      key={g.label}
                      onClick={() => toggleGoal(g.label)}
                      style={{
                        ...styles.goalBtn,
                        background: selectedGoals.includes(g.label)
                          ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`
                          : COLORS.bgCard2,
                        border: selectedGoals.includes(g.label)
                          ? `1.5px solid ${COLORS.accent}`
                          : `1.5px solid ${COLORS.border}`,
                        transform: selectedGoals.includes(g.label) ? "scale(1.04)" : "scale(1)",
                      }}
                    >
                      <span style={{ fontSize: 24 }}>{g.icon}</span>
                      <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 500, marginTop: 4 }}>{g.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {onboardingStep === 2 && (
              <>
                <div style={styles.onboardingEmoji}>{step.image}</div>
                <h1 style={styles.onboardingTitle}>{step.title}</h1>
                <p style={styles.onboardingSubtitle}>{step.subtitle}</p>
                <p style={styles.onboardingBody}>{step.body}</p>
                {selectedGoals.length > 0 && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
                    {selectedGoals.map((g) => (
                      <span key={g} style={{ ...styles.tag, background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}` }}>{g}</span>
                    ))}
                  </div>
                )}
              </>
            )}
            <button
              style={styles.ctaBtn}
              onClick={() => {
                if (onboardingStep < onboardingSteps.length - 1) {
                  setOnboardingStep((s) => s + 1);
                } else {
                  setShowOnboarding(false);
                }
              }}
            >
              {step.cta}
            </button>
            {onboardingStep > 0 && (
              <button
                style={styles.skipBtn}
                onClick={() => setOnboardingStep((s) => s - 1)}
              >
                ← Back
              </button>
            )}
            <div style={styles.dotRow}>
              {onboardingSteps.map((_, i) => (
                <div key={i} style={{ ...styles.dot, background: i === onboardingStep ? COLORS.accent : COLORS.border }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Premium Modal
  if (showPremium) {
    return (
      <div style={styles.root}>
        <div style={styles.modal}>
          <div style={{ ...styles.modalBg, background: `radial-gradient(ellipse at 50% 0%, #9b6dff44 0%, transparent 60%), ${COLORS.bgCard}` }} />
          <div style={styles.modalContent}>
            <button style={styles.closeBtn} onClick={() => setShowPremium(false)}>✕</button>
            <div style={{ fontSize: 48, marginBottom: 8 }}>⭐</div>
            <h2 style={{ color: COLORS.gold, fontSize: 26, fontWeight: 700, marginBottom: 6 }}>PTA Premium</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 28, textAlign: "center" }}>
              Unlock the full transformation journey
            </p>
            <div style={styles.premiumFeatures}>
              {[
                ["Unlimited Courses", "📚"],
                ["All Rituals & Sound Healing", "🎵"],
                ["AI Spiritual Companion", "🤖"],
                ["Offline Access", "📱"],
                ["New Content Weekly", "🌟"],
                ["Personal Progress Tracking", "📊"],
              ].map(([f, icon]) => (
                <div key={f} style={styles.premiumFeatureRow}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 500 }}>{f}</span>
                  <span style={{ color: COLORS.success, marginLeft: "auto", fontSize: 18 }}>✓</span>
                </div>
              ))}
            </div>
            <div style={styles.planRow}>
              <div style={{ ...styles.planCard, border: `2px solid ${COLORS.accent}` }}>
                <div style={styles.planBadge}>Most Popular</div>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 16 }}>Annual</div>
                <div style={{ color: COLORS.gold, fontWeight: 800, fontSize: 28 }}>$59.99</div>
                <div style={{ color: COLORS.textMuted, fontSize: 12 }}>$4.99/month</div>
                <div style={{ color: COLORS.success, fontSize: 13, marginTop: 4 }}>Save 58%</div>
              </div>
              <div style={styles.planCard}>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 16 }}>Monthly</div>
                <div style={{ color: COLORS.gold, fontWeight: 800, fontSize: 28 }}>$11.99</div>
                <div style={{ color: COLORS.textMuted, fontSize: 12 }}>per month</div>
              </div>
            </div>
            <button style={{ ...styles.ctaBtn, marginTop: 20 }}>Start 7-Day Free Trial</button>
            <p style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 12, textAlign: "center" }}>
              Cancel anytime. No charge during trial period.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Course Detail
  if (selectedCourse) {
    const c = selectedCourse;
    return (
      <div style={styles.root}>
        <div style={styles.screen}>
          <div style={{ ...styles.courseHeader, background: `linear-gradient(160deg, ${c.color}, ${c.colorEnd})` }}>
            <button style={styles.backBtn} onClick={() => { setSelectedCourse(null); setIsPlaying(false); setPlayProgress(0); }}>
              ← Back
            </button>
            <div style={{ fontSize: 56, marginBottom: 12 }}>{c.icon}</div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 4, textAlign: "center" }}>{c.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 12 }}>{c.subtitle}</p>
            <div style={styles.courseMeta}>
              <span style={styles.metaChip}>{c.lessons} lessons</span>
              <span style={styles.metaChip}>⏱ {c.duration}</span>
              <span style={styles.metaChip}>⭐ {c.rating}</span>
              <span style={styles.metaChip}>{c.level}</span>
            </div>
          </div>
          <div style={styles.courseBody}>
            <div style={styles.tagRow}>
              {c.tags.map((t) => (
                <span key={t} style={{ ...styles.tag, background: `${c.color}22`, border: `1px solid ${c.color}44` }}>{t}</span>
              ))}
            </div>
            <p style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{c.description}</p>

            {/* Mini Player */}
            <div style={styles.playerCard}>
              <div style={{ color: COLORS.accentLight, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Now Playing</div>
              <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
                {c.chapters[0].title}
              </div>
              <div style={styles.progressBarWrap}>
                <div style={{ ...styles.progressBarFill, width: `${playProgress}%`, background: `linear-gradient(90deg, ${c.color}, ${c.colorEnd})` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ color: COLORS.textMuted, fontSize: 12 }}>
                  {Math.floor((playProgress / 100) * 18)}:{String(Math.floor(((playProgress / 100) * 18 * 60) % 60)).padStart(2, "0")}
                </span>
                <span style={{ color: COLORS.textMuted, fontSize: 12 }}>{c.chapters[0].duration}</span>
              </div>
              <div style={styles.playerControls}>
                <button style={styles.playerBtn} onClick={() => setPlayProgress(Math.max(0, playProgress - 10))}>⏮</button>
                <button
                  style={{ ...styles.playerBtnMain, background: `linear-gradient(135deg, ${c.color}, ${c.colorEnd})` }}
                  onClick={() => setIsPlaying((p) => !p)}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button style={styles.playerBtn} onClick={() => setPlayProgress(Math.min(100, playProgress + 10))}>⏭</button>
              </div>
            </div>

            <h3 style={{ color: COLORS.text, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Course Chapters</h3>
            {c.chapters.map((ch, i) => (
              <div key={i} style={styles.chapterRow}>
                <div style={{ ...styles.chapterNum, background: i === 0 ? `linear-gradient(135deg, ${c.color}, ${c.colorEnd})` : COLORS.bgCard2 }}>
                  {i === 0 ? "▶" : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{ch.title}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>{ch.duration}</div>
                </div>
                {ch.free ? (
                  <span style={{ color: COLORS.success, fontSize: 12, fontWeight: 600 }}>Free</span>
                ) : (
                  <button style={styles.lockBtn} onClick={() => setShowPremium(true)}>🔒</button>
                )}
              </div>
            ))}
            <button style={styles.ctaBtn} onClick={() => setShowPremium(true)}>
              Unlock Full Course ✨
            </button>
          </div>
        </div>
        <BottomNav active={activeTab} onSelect={setActiveTab} />
      </div>
    );
  }

  // Ritual Detail
  if (selectedRitual) {
    const r = selectedRitual;
    return (
      <div style={styles.root}>
        <div style={styles.screen}>
          <div style={{ ...styles.courseHeader, background: `linear-gradient(160deg, ${r.color}, ${r.colorEnd})`, minHeight: 260 }}>
            <button style={styles.backBtn} onClick={() => { setSelectedRitual(null); setRitualActive(false); setRitualProgress(0); }}>
              ← Back
            </button>
            <div style={{ fontSize: 60, marginBottom: 12 }}>{r.icon}</div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{r.title}</h1>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <span style={styles.metaChip}>⏱ {r.duration}</span>
              <span style={styles.metaChip}>{r.type}</span>
            </div>
          </div>
          <div style={styles.courseBody}>
            <div style={{ ...styles.soundCard, border: `1px solid ${r.color}44` }}>
              <span style={{ fontSize: 20 }}>🎵</span>
              <span style={{ color: COLORS.accentLight, fontSize: 14, fontWeight: 600 }}>{r.sound}</span>
            </div>
            <p style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{r.description}</p>

            {ritualActive || ritualProgress > 0 ? (
              <div style={styles.ritualActiveCard}>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 16, marginBottom: 16, textAlign: "center" }}>
                  {ritualProgress >= 100 ? "✅ Ritual Complete!" : "🌀 Practice in Progress..."}
                </div>
                {ritualProgress < 100 && (
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <div style={{ ...styles.breathCircle, background: `radial-gradient(circle, ${r.color}44, ${r.colorEnd}22)`, border: `2px solid ${r.color}`, animation: ritualActive ? "pulseBreath 4s ease-in-out infinite" : "none" }}>
                      <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>
                        {ritualActive ? "Breathe..." : "Paused"}
                      </span>
                    </div>
                  </div>
                )}
                <div style={styles.progressBarWrap}>
                  <div style={{ ...styles.progressBarFill, width: `${ritualProgress}%`, background: `linear-gradient(90deg, ${r.color}, ${r.colorEnd})` }} />
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: 12, textAlign: "center", marginTop: 8 }}>
                  {Math.floor(ritualProgress)}% complete
                </div>
                {ritualProgress < 100 && (
                  <button
                    style={{ ...styles.ctaBtn, marginTop: 16, background: ritualActive ? `linear-gradient(135deg, #ff4455, #cc1133)` : `linear-gradient(135deg, ${r.color}, ${r.colorEnd})` }}
                    onClick={() => setRitualActive((a) => !a)}
                  >
                    {ritualActive ? "⏸ Pause" : "▶ Resume"}
                  </button>
                )}
                {ritualProgress >= 100 && (
                  <button style={styles.ctaBtn} onClick={() => { setRitualProgress(0); setRitualActive(false); }}>
                    Practice Again
                  </button>
                )}
              </div>
            ) : (
              <button
                style={{ ...styles.ctaBtn, background: `linear-gradient(135deg, ${r.color}, ${r.colorEnd})` }}
                onClick={() => setRitualActive(true)}
              >
                Begin Ritual ▶
              </button>
            )}

            <div style={styles.infoCard}>
              <h4 style={{ color: COLORS.text, fontWeight: 700, marginBottom: 12 }}>How to Prepare</h4>
              {["Find a quiet, comfortable space", "Put on headphones for best sound healing experience", "Sit or lie down — whatever feels right", "Set an intention for this practice"].map((tip) => (
                <div key={tip} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: COLORS.accent, fontSize: 14 }}>✦</span>
                  <span style={{ color: COLORS.textMuted, fontSize: 13 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav active={activeTab} onSelect={setActiveTab} />
      </div>
    );
  }

  // Main App
  return (
    <div style={styles.root}>
      <div style={styles.screen}>
        {/* Explore Tab */}
        {activeTab === "explore" && (
          <div style={styles.tab}>
            <div style={styles.header}>
              <div>
                <div style={{ color: COLORS.textMuted, fontSize: 13 }}>Good morning ✨</div>
                <h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, marginTop: 2 }}>Your Journey</h1>
              </div>
              <button style={styles.avatarBtn} onClick={() => setActiveTab("profile")}>
                <span style={{ fontSize: 22 }}>👤</span>
              </button>
            </div>

            {/* Hero Banner */}
            <div style={styles.heroBanner}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #9b6dff22, #40e0c022)", borderRadius: 20 }} />
              <div style={{ position: "relative" }}>
                <div style={{ color: COLORS.goldLight, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>FEATURED COURSE</div>
                <h2 style={{ color: COLORS.text, fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Kundalini Awakening</h2>
                <p style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
                  Activate your vital energy with guided, safe energetic work.
                </p>
                <button style={{ ...styles.ctaBtn, padding: "10px 24px", fontSize: 13 }} onClick={() => setSelectedCourse(courses[0])}>
                  Start Learning →
                </button>
              </div>
              <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", fontSize: 60, opacity: 0.6 }}>🔥</div>
            </div>

            {/* Continue Learning */}
            {userProgress.length > 0 && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Continue Learning</h2>
                <div style={{ overflowX: "auto", display: "flex", gap: 12, paddingBottom: 8 }}>
                  {userProgress.map((p, i) => {
                    const course = courses.find((c) => c.title === p.course) || rituals.find((r) => r.title === p.course);
                    if (!course) return null;
                    return (
                      <div
                        key={i}
                        style={{ ...styles.continueCard, minWidth: 200, cursor: "pointer" }}
                        onClick={() => p.isRitual ? setSelectedRitual(rituals.find(r => r.title === p.course)) : setSelectedCourse(courses.find(c => c.title === p.course))}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                          <span style={{ fontSize: 28 }}>{course.icon}</span>
                          <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{p.course}</span>
                        </div>
                        <div style={styles.progressBarWrap}>
                          <div style={{ ...styles.progressBarFill, width: `${p.progress}%`, background: `linear-gradient(90deg, ${course.color}, ${course.colorEnd || COLORS.accent})` }} />
                        </div>
                        <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 6 }}>
                          {p.lessonsComplete}/{p.total} complete · {p.progress}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Categories */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Explore by Path</h2>
              <div style={styles.categoriesRow}>
                {[
                  { label: "Energy Work", icon: "⚡", color: "#ff6b35" },
                  { label: "Sleep", icon: "🌙", color: "#1a78ff" },
                  { label: "Healing", icon: "💛", color: "#f0c060" },
                  { label: "Mindset", icon: "🧠", color: "#9b6dff" },
                  { label: "Sound", icon: "🎵", color: "#40e0c0" },
                  { label: "Rituals", icon: "🕯️", color: "#ff6eb0" },
                ].map((cat) => (
                  <button
                    key={cat.label}
                    style={{ ...styles.catBtn, background: `${cat.color}1a`, border: `1px solid ${cat.color}44` }}
                    onClick={() => setActiveTab("courses")}
                  >
                    <span style={{ fontSize: 22 }}>{cat.icon}</span>
                    <span style={{ color: COLORS.text, fontSize: 11, fontWeight: 500, marginTop: 4 }}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* All Courses */}
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Featured Courses</h2>
                <button style={styles.seeAllBtn} onClick={() => setActiveTab("courses")}>See all →</button>
              </div>
              {courses.slice(0, 3).map((c) => (
                <CourseCard key={c.id} course={c} onSelect={setSelectedCourse} onPremium={() => setShowPremium(true)} />
              ))}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div style={styles.tab}>
            <div style={styles.header}>
              <h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800 }}>All Courses</h1>
              <span style={{ color: COLORS.textMuted, fontSize: 13 }}>{courses.length} programs</span>
            </div>
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} onSelect={setSelectedCourse} onPremium={() => setShowPremium(true)} />
            ))}
          </div>
        )}

        {/* Rituals Tab */}
        {activeTab === "rituals" && (
          <div style={styles.tab}>
            <div style={styles.header}>
              <div>
                <h1 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800 }}>Daily Rituals</h1>
                <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>Short practices with sound healing</p>
              </div>
            </div>
            <div style={{ ...styles.infoCard, marginBottom: 20, background: `linear-gradient(135deg, ${COLORS.accent}22, ${COLORS.teal}11)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>🎵</span>
                <div>
                  <div style={{ color: COLORS.accentLight, fontWeight: 700, fontSize: 14 }}>Sound Healing Frequencies</div>
                  <div style={{ color: COLORS.textMuted, fontSize: 12 }}>Every ritual includes healing frequencies to guide your practice deeper</div>
                </div>
              </div>
            </div>
            <div style={styles.ritualsGrid}>
              {rituals.map((r) => (
                <button
                  key={r.id}
                  style={styles.ritualCard}
                  onClick={() => setSelectedRitual(r)}
                >
                  <div style={{ ...styles.ritualGradient, background: `linear-gradient(135deg, ${r.color}, ${r.colorEnd})` }} />
                  <div style={{ position: "relative" }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{r.icon}</div>
                    <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{r.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 6 }}>{r.type}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={styles.metaChip}>⏱ {r.duration}</span>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 6 }}>{r.sound}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div style={{ ...styles.tab, display: "flex", flexDirection: "column", height: "calc(100dvh - 70px)" }}>
            <div style={styles.header}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={styles.chatAvatar}>🌟</div>
                <div>
                  <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 16 }}>Spiritual Guide</div>
                  <div style={{ color: COLORS.success, fontSize: 12 }}>● Always here for you</div>
                </div>
              </div>
            </div>
            <div style={styles.chatMessages}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                  {m.role === "assistant" && (
                    <div style={styles.chatAvatarSmall}>🌟</div>
                  )}
                  <div style={{
                    ...styles.chatBubble,
                    background: m.role === "user"
                      ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`
                      : COLORS.bgCard2,
                    borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                    maxWidth: "80%",
                  }}>
                    <span style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                      {m.text.split("**").map((part, j) =>
                        j % 2 === 1
                          ? <strong key={j} style={{ color: COLORS.goldLight }}>{part}</strong>
                          : part
                      )}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={styles.chatAvatarSmall}>🌟</div>
                  <div style={{ ...styles.chatBubble, background: COLORS.bgCard2 }}>
                    <div style={styles.typingDots}>
                      <span style={{ ...styles.typingDot, animationDelay: "0s" }} />
                      <span style={{ ...styles.typingDot, animationDelay: "0.2s" }} />
                      <span style={{ ...styles.typingDot, animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding: "8px 16px 4px" }}>
              <div style={{ overflowX: "auto", display: "flex", gap: 8, paddingBottom: 8 }}>
                {quickReplies.map((q) => (
                  <button key={q} style={styles.quickReply} onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <div style={styles.chatInputRow}>
              <input
                style={styles.chatInput}
                placeholder="Share what's on your mind..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button style={styles.sendBtn} onClick={() => sendMessage()}>
                ➤
              </button>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={styles.tab}>
            <div style={{ ...styles.profileHeader, background: "linear-gradient(160deg, #2a1a50, #0a0612)" }}>
              <div style={styles.profileAvatar}>👤</div>
              <h2 style={{ color: COLORS.text, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Spiritual Seeker</h2>
              <p style={{ color: COLORS.textMuted, fontSize: 13 }}>Member since June 2025</p>
              <button style={{ ...styles.ctaBtn, padding: "10px 28px", fontSize: 13, marginTop: 16 }} onClick={() => setShowPremium(true)}>
                ⭐ Upgrade to Premium
              </button>
            </div>

            {/* Stats */}
            <div style={styles.statsRow}>
              {[["7", "Day Streak 🔥"], ["3", "Courses"], ["2.5h", "Practice Time"], ["12", "Rituals Done"]].map(([val, label]) => (
                <div key={label} style={styles.statCard}>
                  <div style={{ color: COLORS.gold, fontSize: 22, fontWeight: 800 }}>{val}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: 11, textAlign: "center", lineHeight: 1.3 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* My Courses */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>My Progress</h2>
              {userProgress.map((p, i) => {
                const course = courses.find((c) => c.title === p.course) || rituals.find((r) => r.title === p.course);
                if (!course) return null;
                return (
                  <div key={i} style={styles.progressCard}>
                    <span style={{ fontSize: 28 }}>{course.icon}</span>
                    <div style={{ flex: 1, marginLeft: 12 }}>
                      <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 14 }}>{p.course}</div>
                      <div style={styles.progressBarWrap}>
                        <div style={{ ...styles.progressBarFill, width: `${p.progress}%`, background: `linear-gradient(90deg, ${course.color}, ${course.colorEnd || COLORS.accent})` }} />
                      </div>
                      <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>
                        {p.lessonsComplete} / {p.total} · {p.progress}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Settings */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Settings</h2>
              {[
                ["🔔", "Notifications", "Daily reminders"],
                ["🎵", "Sound Preferences", "Headphones recommended"],
                ["🌙", "Dark Mode", "Always on"],
                ["📖", "My Journal", "Coming soon"],
                ["🔒", "Privacy Policy", ""],
                ["📄", "Terms of Service", ""],
              ].map(([icon, label, sub]) => (
                <div key={label} style={styles.settingRow}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <div style={{ flex: 1, marginLeft: 12 }}>
                    <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{label}</div>
                    {sub && <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{sub}</div>}
                  </div>
                  <span style={{ color: COLORS.textMuted, fontSize: 18 }}>›</span>
                </div>
              ))}
            </div>

            <p style={{ color: COLORS.textMuted, fontSize: 12, textAlign: "center", padding: "16px 0 80px" }}>
              Personal Transformation App v1.0<br />
              Made with ❤️ by PTA
            </p>
          </div>
        )}
      </div>
      <BottomNav active={activeTab} onSelect={setActiveTab} />
      <style>{`
        @keyframes pulseBreath {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        input { outline: none; }
        button { cursor: pointer; border: none; background: none; }
      `}</style>
    </div>
  );
}

function CourseCard({ course: c, onSelect, onPremium }) {
  return (
    <div
      style={{
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 18,
        marginBottom: 16,
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => onSelect(c)}
    >
      <div style={{ background: `linear-gradient(135deg, ${c.color}33, ${c.colorEnd}22)`, padding: "20px 20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div style={{ fontSize: 44 }}>{c.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 style={{ color: COLORS.text, fontWeight: 800, fontSize: 17, lineHeight: 1.2, marginBottom: 3 }}>{c.title}</h3>
              <span style={{ color: COLORS.gold, fontSize: 12, fontWeight: 600 }}>⭐ {c.rating}</span>
            </div>
            <p style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 8 }}>{c.subtitle}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ ...styles.metaChip, background: `${c.color}22`, border: `1px solid ${c.color}44` }}>{c.lessons} lessons</span>
              <span style={{ ...styles.metaChip, background: `${c.color}22`, border: `1px solid ${c.color}44` }}>⏱ {c.duration}</span>
              <span style={{ ...styles.metaChip, background: `${c.color}22`, border: `1px solid ${c.color}44` }}>{c.level}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.5, flex: 1, marginRight: 12 }}>
          {c.description.slice(0, 80)}...
        </p>
        <button
          style={{ background: `linear-gradient(135deg, ${c.color}, ${c.colorEnd})`, color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}
          onClick={(e) => { e.stopPropagation(); onSelect(c); }}
        >
          Explore →
        </button>
      </div>
    </div>
  );
}

function BottomNav({ active, onSelect }) {
  const tabs = [
    { id: "explore", icon: "🏠", label: "Home" },
    { id: "courses", icon: "📚", label: "Courses" },
    { id: "rituals", icon: "🕯️", label: "Rituals" },
    { id: "chat", icon: "💬", label: "Guide" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <nav style={styles.bottomNav}>
      {tabs.map((t) => (
        <button
          key={t.id}
          style={{ ...styles.navBtn, ...(active === t.id ? styles.navBtnActive : {}) }}
          onClick={() => onSelect(t.id)}
        >
          <span style={{ fontSize: 22 }}>{t.icon}</span>
          <span style={{ fontSize: 10, marginTop: 2, color: active === t.id ? COLORS.accent : COLORS.textMuted, fontWeight: active === t.id ? 700 : 400 }}>
            {t.label}
          </span>
          {active === t.id && <div style={styles.navActiveBar} />}
        </button>
      ))}
    </nav>
  );
}

const styles = {
  root: {
    background: COLORS.bg,
    minHeight: "100dvh",
    maxWidth: 430,
    margin: "0 auto",
    position: "relative",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflow: "hidden",
  },
  screen: {
    overflowY: "auto",
    height: "calc(100dvh - 70px)",
    scrollbarWidth: "none",
  },
  tab: {
    padding: "16px 16px 24px",
    minHeight: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 8,
  },
  heroBanner: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 20,
    padding: 22,
    marginBottom: 24,
    position: "relative",
    overflow: "hidden",
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: 800,
    marginBottom: 14,
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  seeAllBtn: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: 600,
    background: "none",
    border: "none",
  },
  categoriesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 4,
  },
  catBtn: {
    borderRadius: 14,
    padding: "14px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  continueCard: {
    background: COLORS.bgCard2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: 14,
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 430,
    background: `${COLORS.bgCard}f5`,
    backdropFilter: "blur(20px)",
    borderTop: `1px solid ${COLORS.border}`,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    zIndex: 100,
    padding: "0 8px",
  },
  navBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    padding: "8px 12px",
    borderRadius: 12,
    position: "relative",
    flex: 1,
    transition: "opacity 0.2s",
  },
  navBtnActive: {
    background: `${COLORS.accent}15`,
  },
  navActiveBar: {
    position: "absolute",
    bottom: 2,
    left: "50%",
    transform: "translateX(-50%)",
    width: 20,
    height: 3,
    borderRadius: 2,
    background: COLORS.accent,
  },
  courseHeader: {
    padding: "60px 20px 30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: 600,
    background: "rgba(0,0,0,0.2)",
    border: "none",
    borderRadius: 20,
    padding: "6px 14px",
    cursor: "pointer",
  },
  courseMeta: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 8,
  },
  metaChip: {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    borderRadius: 20,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 600,
  },
  courseBody: {
    padding: "20px 16px 100px",
  },
  tagRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    background: `${COLORS.accent}1a`,
    border: `1px solid ${COLORS.accent}44`,
    color: COLORS.accentLight,
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    fontWeight: 500,
  },
  playerCard: {
    background: COLORS.bgCard2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },
  progressBarWrap: {
    background: COLORS.border,
    borderRadius: 10,
    height: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 10,
    transition: "width 0.3s ease",
  },
  playerControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 14,
  },
  playerBtn: {
    color: COLORS.textMuted,
    fontSize: 24,
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "50%",
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  playerBtnMain: {
    color: "#fff",
    fontSize: 24,
    border: "none",
    borderRadius: "50%",
    width: 56,
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(155,109,255,0.4)",
  },
  chapterRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: COLORS.bgCard2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "12px 14px",
    marginBottom: 8,
  },
  chapterNum: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: COLORS.bgCard2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  lockBtn: {
    background: "none",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    opacity: 0.7,
  },
  ctaBtn: {
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    color: "#fff",
    border: "none",
    borderRadius: 16,
    padding: "14px 24px",
    fontSize: 15,
    fontWeight: 700,
    width: "100%",
    cursor: "pointer",
    marginTop: 8,
    boxShadow: "0 4px 20px rgba(155,109,255,0.35)",
    letterSpacing: 0.3,
  },
  infoCard: {
    background: COLORS.bgCard2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  soundCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: COLORS.bgCard2,
    borderRadius: 14,
    padding: "12px 16px",
    marginBottom: 16,
  },
  ritualActiveCard: {
    background: COLORS.bgCard2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  breathCircle: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
  ritualsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  ritualCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
    padding: 16,
    textAlign: "left",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  ritualGradient: {
    position: "absolute",
    inset: 0,
    opacity: 0.12,
    borderRadius: 18,
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 16px",
    display: "flex",
    flexDirection: "column",
    scrollbarWidth: "none",
  },
  chatAvatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  chatAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    marginRight: 8,
    flexShrink: 0,
    alignSelf: "flex-end",
  },
  chatBubble: {
    borderRadius: 18,
    padding: "12px 16px",
    maxWidth: "80%",
  },
  chatInputRow: {
    display: "flex",
    gap: 10,
    padding: "8px 16px 16px",
    alignItems: "center",
  },
  chatInput: {
    flex: 1,
    background: COLORS.bgCard2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 24,
    padding: "12px 18px",
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "inherit",
  },
  sendBtn: {
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    border: "none",
    borderRadius: "50%",
    width: 46,
    height: 46,
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  quickReply: {
    background: `${COLORS.accent}1a`,
    border: `1px solid ${COLORS.accent}44`,
    color: COLORS.accentLight,
    borderRadius: 20,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  },
  typingDots: {
    display: "flex",
    gap: 5,
    padding: "4px 2px",
  },
  typingDot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: COLORS.accent,
    animation: "typingBounce 1s ease-in-out infinite",
  },
  profileHeader: {
    padding: "40px 20px 30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0 0 28px 28px",
    marginBottom: 24,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    marginBottom: 12,
    border: `3px solid ${COLORS.gold}`,
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    marginBottom: 24,
  },
  statCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "12px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  progressCard: {
    display: "flex",
    alignItems: "center",
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 10,
  },
  settingRow: {
    display: "flex",
    alignItems: "center",
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 8,
    cursor: "pointer",
  },
  avatarBtn: {
    background: COLORS.bgCard2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "50%",
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  // Onboarding
  onboarding: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  onboardingBg: {
    position: "absolute",
    inset: 0,
  },
  onboardingContent: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: "40px 24px 60px",
    textAlign: "center",
  },
  onboardingLogoWrap: {
    marginBottom: 24,
  },
  onboardingLogo: {
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    borderRadius: 20,
    padding: "10px 24px",
    color: "#fff",
    fontWeight: 900,
    fontSize: 22,
    letterSpacing: 2,
    display: "inline-block",
    boxShadow: "0 4px 24px rgba(155,109,255,0.5)",
  },
  onboardingEmoji: {
    fontSize: 72,
    marginBottom: 20,
    filter: "drop-shadow(0 0 20px rgba(155,109,255,0.6))",
  },
  onboardingTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 900,
    marginBottom: 8,
    lineHeight: 1.2,
  },
  onboardingSubtitle: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 12,
  },
  onboardingBody: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 1.7,
    marginBottom: 24,
    maxWidth: 320,
  },
  goalsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
    width: "100%",
    marginBottom: 28,
  },
  goalBtn: {
    borderRadius: 16,
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.2s, background 0.2s",
    fontFamily: "inherit",
  },
  skipBtn: {
    color: COLORS.textMuted,
    fontSize: 14,
    background: "none",
    border: "none",
    marginTop: 12,
    cursor: "pointer",
  },
  dotRow: {
    display: "flex",
    gap: 8,
    marginTop: 24,
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    transition: "background 0.3s",
  },
  // Modal
  modal: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 20,
  },
  modalBg: {
    position: "absolute",
    inset: 0,
  },
  modalContent: {
    position: "relative",
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 28,
    padding: "32px 24px",
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    background: COLORS.bgCard2,
    border: `1px solid ${COLORS.border}`,
    color: COLORS.textMuted,
    borderRadius: "50%",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
  },
  premiumFeatures: {
    width: "100%",
    background: COLORS.bgCard2,
    borderRadius: 16,
    padding: "8px 16px",
    marginBottom: 20,
  },
  premiumFeatureRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 0",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  planRow: {
    display: "flex",
    gap: 12,
    width: "100%",
  },
  planCard: {
    flex: 1,
    background: COLORS.bgCard2,
    border: `1.5px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  planBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    textAlign: "center",
    padding: "3px 0",
    letterSpacing: 0.5,
  },
};