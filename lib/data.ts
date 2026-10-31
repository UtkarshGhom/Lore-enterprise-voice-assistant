export interface KnowledgeRecord {
  id: string;
  title: string;
  summary: string;
  contributor: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  status: "verified" | "review_due" | "draft";
  category: "Engineering" | "Operations" | "Robotics" | "Hardware" | "DevOps" | "Product";
  thumbnail: string;
  systemOrProject?: string;
  context?: string;
  decisionOrProcedure?: string;
  rationale?: string;
  exceptions?: string[];
  risks?: string[];
  applicability?: string;
  keyInsights?: string[];
  audioDuration?: string;
  transcriptExcerpt?: string;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tags: string[];
  contributionsCount: number;
}

export interface ConversationHistoryItem {
  id: string;
  query: string;
  timeAgo: string;
}

export interface KnowledgeGap {
  id: string;
  question: string;
  category: string;
  frequency: number;
  lastAsked: string;
  suggestedExpert: string;
  status: "unassigned" | "interview_scheduled" | "resolved";
}

export const initialKnowledgeRecords: KnowledgeRecord[] = [
  {
    id: "rec-1",
    title: "Sensor Calibration Procedure",
    summary: "Step-by-step calibration process with temperature compensation and common troubleshooting steps.",
    contributor: {
      name: "Rohit Sharma",
      role: "Hardware Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    date: "Oct 18, 2026",
    status: "verified",
    category: "Hardware",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80",
    systemOrProject: "Industrial Robotics Field Units",
    context: "Field sensors showed consistent drift exceeding +/- 4% when operating in outdoor environments with ambient temps > 35°C.",
    decisionOrProcedure: "Use multi-point calibration with temperature compensation algorithm instead of baseline single-point zeroing.",
    rationale: "Single-point zeroing failed to account for thermal expansion and ADC voltage reference drift under variable sunlight.",
    exceptions: ["Does not apply to indoor cleanroom sensors running under constant 21°C climate control."],
    risks: ["Skipping step 4 (thermal soak period) leads to calibration offset error."],
    applicability: "Applies to rev 3.2 PCB hardware and above using the Bosch BNO085 IMU.",
    keyInsights: [
      "Previous single-point calibration caused drift under high temperature (>35°C).",
      "New multi-point calibration improves accuracy by ~32% in outdoor field trials.",
      "Temperature compensation is critical for outdoor deployments to prevent yaw drift.",
      "Field teams must use the provided calibration tool and adhere strictly to the 5-step procedure."
    ],
    audioDuration: "04:32",
    transcriptExcerpt: "The earlier single-point calibration did not account for thermal variation, which led to inconsistent readings. The new procedure uses multi-point calibration with temperature compensation..."
  },
  {
    id: "rec-2",
    title: "Billing Architecture Decision",
    summary: "Why we moved to a separate retry mechanism and idempotency keys across all payment processors.",
    contributor: {
      name: "Ananya Kulkarni",
      role: "Backend Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    date: "Oct 15, 2026",
    status: "verified",
    category: "Engineering",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80",
    systemOrProject: "Core Billing & Stripe Gateway",
    context: "Network timeouts between the client and Stripe resulted in duplicate payment charges when users tapped retry.",
    decisionOrProcedure: "Enforce a deterministic UUIDv5 idempotency key based on user_id, order_id, and attempt_window.",
    rationale: "Stripe and Razorpay gateways natively deduplicate transactions matching identical idempotency headers within a 24-hour window.",
    exceptions: ["Free tier quota claims do not use gateway idempotency keys."],
    risks: ["Re-generating keys on client retries completely defeats the protection."],
    applicability: "All billing API v2 endpoints and webhook consumers.",
    keyInsights: [
      "Duplicate payments dropped to zero following deployment of deterministic keys.",
      "Idempotency keys must be persisted before outbound network calls, not after.",
      "Retry policies should use exponential backoff with jitter up to a max of 3 attempts."
    ],
    audioDuration: "05:12",
    transcriptExcerpt: "Without a stable key, a retry could be processed as a second payment. We had an incident where 47 users were charged twice during a cloud flare outage..."
  },
  {
    id: "rec-3",
    title: "Production Deployment Guide",
    summary: "Complete deployment process for production zero-downtime releases and emergency canary rollbacks.",
    contributor: {
      name: "Karan Mehta",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    date: "Oct 12, 2026",
    status: "review_due",
    category: "DevOps",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
    systemOrProject: "Kubernetes ArgoCD Infrastructure",
    context: "Past microservice migrations caused 4-minute API blips due to non-graceful SIGTERM handling.",
    decisionOrProcedure: "Implement 30s preStop hook with readiness probe grace period before ArgoCD swaps traffic.",
    rationale: "Ensures in-flight connections finish processing before the pod container receives termination signal.",
    exceptions: ["Stateless workers (batch jobs) can shut down immediately."],
    risks: ["Database connection pools must be closed gracefully to avoid leaking Postgres connections."],
    applicability: "Cluster k8s-prod-us-east-1 and staging mirrors.",
    keyInsights: [
      "Always inspect ArgoCD sync status and check Datadog APM 5xx error rate for 5 minutes during canary 10% rollout.",
      "Automated rollback triggers if error budget consumption exceeds 0.5% in 3 minutes."
    ],
    audioDuration: "06:45",
    transcriptExcerpt: "If deployment fails, do not manually edit deployment yamls. Run `argo app rollback billing-service` and notify the on-call channel immediately..."
  },
  {
    id: "rec-4",
    title: "Motor Controller Redesign",
    summary: "Reasoning behind the controller change and lessons learned from thermal dissipation tests.",
    contributor: {
      name: "Priya Desai",
      role: "Robotics Engineer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    date: "Oct 10, 2026",
    status: "verified",
    category: "Robotics",
    thumbnail: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=500&q=80",
    systemOrProject: "Arm Actuator Joint 2 & 3",
    context: "Brushless DC drivers suffered thermal throttling during continuous pick-and-place cycles exceeding 25kg payload.",
    decisionOrProcedure: "Upgraded from discrete MOSFETs to integrated gallium nitride (GaN) power stages with custom copper heatsinks.",
    rationale: "GaN switches have drastically lower RDS(on) and switching losses, keeping die temperature under 68°C under continuous 30A load.",
    exceptions: ["Low-torque gripper motors still utilize the legacy driver board."],
    risks: ["GaN gates require strict 6V limit; overvoltage instantly damages the driver."],
    applicability: "All Gen-4 robotic arms produced after Q3 2026.",
    keyInsights: [
      "Thermal margin increased by 24°C under heavy cyclical load.",
      "Firmware PWM frequency was tuned from 20kHz to 40kHz for silent operation and ripple reduction."
    ],
    audioDuration: "03:50",
    transcriptExcerpt: "We initially tried adding bigger fans, but that introduced acoustic noise that violated hospital client requirements. GaN was the right engineering choice."
  },
  {
    id: "rec-5",
    title: "Common Hardware Failures",
    summary: "List of common issues and troubleshooting steps for field technicians during first-line maintenance.",
    contributor: {
      name: "Aayush Patil",
      role: "Mechanical Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
    date: "Oct 08, 2026",
    status: "draft",
    category: "Operations",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
    systemOrProject: "Field Support Toolkit",
    context: "Field technicians were replacing entire gearbox assemblies for simple harmonic drive lubrication dry-outs.",
    decisionOrProcedure: "Created a diagnostic acoustic flow-chart to differentiate bearing wear from gear backlash.",
    rationale: "Reduces warranty replacement cost by $4,200 per false assembly return.",
    exceptions: ["If metal shavings are visible in the drain plug, immediate full replacement is required."],
    risks: ["Technicians must lock out high-voltage bus before opening the service port."],
    applicability: "Field operations globally.",
    keyInsights: [
      "80% of reported 'motor grind' was actually dry synthetic grease in harmonic reducer gearboxes.",
      "Re-greasing using Mobilgrease 28 resolves the issue in under 20 minutes without factory RMA."
    ],
    audioDuration: "04:15",
    transcriptExcerpt: "Listen to the pitch. A high-frequency whine is electrical, but a rhythmic click every 4 revolutions indicates grease channel starvation."
  }
];

export const expertContributors: Contributor[] = [
  {
    id: "c-1",
    name: "Rohit Sharma",
    role: "Hardware Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    tags: ["Sensors", "Calibration", "Field Ops"],
    contributionsCount: 12,
  },
  {
    id: "c-2",
    name: "Ananya Kulkarni",
    role: "Backend Engineer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    tags: ["Architecture", "Billing", "PostgreSQL"],
    contributionsCount: 8,
  },
  {
    id: "c-3",
    name: "Karan Mehta",
    role: "DevOps Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    tags: ["Deployment", "CI/CD", "Kubernetes"],
    contributionsCount: 10,
  },
  {
    id: "c-4",
    name: "Priya Desai",
    role: "Robotics Engineer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    tags: ["Control Systems", "GaN", "Actuators"],
    contributionsCount: 7,
  },
  {
    id: "c-5",
    name: "Aayush Patil",
    role: "Mechanical Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    tags: ["Hardware", "Harmonic Drives", "Diagnostics"],
    contributionsCount: 6,
  },
  {
    id: "c-6",
    name: "Meera Nair",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    tags: ["Process", "Documentation", "Compliance"],
    contributionsCount: 5,
  },
];

export const recentConversations: ConversationHistoryItem[] = [
  { id: "h-1", query: "Why does the sensor drift over time?", timeAgo: "2 hours ago" },
  { id: "h-2", query: "What's the rollback process if deployment fails?", timeAgo: "Yesterday" },
  { id: "h-3", query: "Explain the motor controller update.", timeAgo: "2 days ago" },
  { id: "h-4", query: "How is data stored from the LiDAR sensor?", timeAgo: "2 days ago" },
  { id: "h-5", query: "What were the alternatives to ROS2 for this project?", timeAgo: "3 days ago" },
];

export const categoryBreakdown = [
  { name: "Engineering", count: 10, percentage: 85 },
  { name: "Operations", count: 6, percentage: 55 },
  { name: "Robotics", count: 5, percentage: 48 },
  { name: "Hardware", count: 4, percentage: 38 },
  { name: "DevOps", count: 3, percentage: 30 },
  { name: "Product", count: 2, percentage: 20 },
];

export const knowledgeGapsData: KnowledgeGap[] = [
  {
    id: "gap-1",
    question: "What is the emergency shutdown sequence for the High-Voltage Battery Pack?",
    category: "Hardware",
    frequency: 14,
    lastAsked: "4 hours ago",
    suggestedExpert: "Rohit Sharma",
    status: "interview_scheduled"
  },
  {
    id: "gap-2",
    question: "How do we rotate SSL certificates on legacy edge gateways?",
    category: "DevOps",
    frequency: 9,
    lastAsked: "Yesterday",
    suggestedExpert: "Karan Mehta",
    status: "unassigned"
  },
  {
    id: "gap-3",
    question: "Why do we reject CAN bus frames with ID 0x3FA in the firmware filter?",
    category: "Robotics",
    frequency: 7,
    lastAsked: "3 days ago",
    suggestedExpert: "Priya Desai",
    status: "unassigned"
  }
];
