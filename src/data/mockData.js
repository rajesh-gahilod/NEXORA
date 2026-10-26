/**
 * Realistic Mock Data for NEXORA AI Demo Mode
 * Note: Clearly marked as Simulated Demo Data in the UI when offline from Spring Boot.
 */

export const DEMO_USER = {
  id: "usr_99214a",
  name: "Alexandra Vance",
  email: "alexandra.vance@nexora.io",
  role: "Chief Analytics Officer",
  organization: "Global Enterprise Solutions Inc.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo_token_nexora_enterprise_analytics",
  lastLogin: "2026-10-26T14:22:10Z"
};

export const KPI_DATA = {
  totalRevenue: {
    value: 1284920,
    formatted: "$1,284,920",
    change: 14.2,
    trend: "up",
    period: "vs last month",
    target: "$1,200,000",
    progress: 107.1
  },
  totalOrders: {
    value: 18429,
    formatted: "18,429",
    change: 8.5,
    trend: "up",
    period: "vs last month",
    target: "17,000",
    progress: 108.4
  },
  activeCustomers: {
    value: 4892,
    formatted: "4,892",
    change: 12.1,
    trend: "up",
    period: "vs last month",
    target: "4,500",
    progress: 108.7
  },
  conversionRate: {
    value: 3.42,
    formatted: "3.42%",
    change: 0.8,
    trend: "up",
    period: "vs last month",
    target: "3.20%",
    progress: 106.8
  },
  avgOrderValue: {
    value: 142.50,
    formatted: "$142.50",
    change: -1.4,
    trend: "down",
    period: "vs last month",
    target: "$150.00",
    progress: 95.0
  }
};

export const REVENUE_TRENDS = [
  { month: "Nov", revenue: 84000, previous: 76000, forecast: 82000, orders: 1240 },
  { month: "Dec", revenue: 98500, previous: 89000, forecast: 95000, orders: 1420 },
  { month: "Jan", revenue: 92000, previous: 84000, forecast: 90000, orders: 1350 },
  { month: "Feb", revenue: 105400, previous: 91000, forecast: 101000, orders: 1510 },
  { month: "Mar", revenue: 118200, previous: 98000, forecast: 112000, orders: 1680 },
  { month: "Apr", revenue: 112000, previous: 102000, forecast: 115000, orders: 1610 },
  { month: "May", revenue: 125600, previous: 108000, forecast: 122000, orders: 1790 },
  { month: "Jun", revenue: 134200, previous: 114000, forecast: 129000, orders: 1920 },
  { month: "Jul", revenue: 129000, previous: 118000, forecast: 132000, orders: 1840 },
  { month: "Aug", revenue: 141500, previous: 122000, forecast: 138000, orders: 2010 },
  { month: "Sep", revenue: 149800, previous: 127000, forecast: 144000, orders: 2130 },
  { month: "Oct", revenue: 158720, previous: 132000, forecast: 152000, orders: 2260 },
];

export const SALES_BY_SEGMENT = [
  { segment: "Enterprise SaaS", revenue: 548000, orders: 412, share: 42.6, growth: 18.4 },
  { segment: "Mid-Market", revenue: 382000, orders: 1890, share: 29.7, growth: 12.1 },
  { segment: "Small Business", revenue: 224000, orders: 4920, share: 17.4, growth: 8.6 },
  { segment: "Self-Serve / Pro", revenue: 130920, orders: 11207, share: 10.3, growth: 22.5 },
];

export const CUSTOMER_DISTRIBUTION = [
  { name: "North America", value: 46, count: 2250, fill: "#8B5CF6" },
  { name: "Europe (EMEA)", value: 28, count: 1370, fill: "#38BDF8" },
  { name: "Asia-Pacific (APAC)", value: 18, count: 880, fill: "#6366F1" },
  { name: "Latin America", value: 8, count: 392, fill: "#10B981" },
];

export const RECENT_TRANSACTIONS = [
  {
    id: "TX-94812",
    customer: "Starlight Dynamics",
    contact: "elena.rostova@starlight.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    tier: "Enterprise",
    amount: 24500.00,
    status: "Completed",
    date: "2026-10-26 14:15",
    paymentMethod: "Wire Transfer (ACH)",
    invoiceId: "INV-2026-881"
  },
  {
    id: "TX-94811",
    customer: "Vanguard Tech Labs",
    contact: "marcus.chen@vanguard.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    tier: "Enterprise",
    amount: 18200.00,
    status: "Completed",
    date: "2026-10-26 13:42",
    paymentMethod: "Corporate Card",
    invoiceId: "INV-2026-880"
  },
  {
    id: "TX-94810",
    customer: "Apex Financial Group",
    contact: "sarah.jenkins@apexfin.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    tier: "Mid-Market",
    amount: 6750.00,
    status: "Pending",
    date: "2026-10-26 12:05",
    paymentMethod: "Direct Debit",
    invoiceId: "INV-2026-879"
  },
  {
    id: "TX-94809",
    customer: "CloudSphere Global",
    contact: "david.miller@cloudsphere.net",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    tier: "Mid-Market",
    amount: 4900.00,
    status: "Completed",
    date: "2026-10-26 10:28",
    paymentMethod: "Stripe",
    invoiceId: "INV-2026-878"
  },
  {
    id: "TX-94808",
    customer: "Nexus Retail Systems",
    contact: "amara.k@nexusretail.co",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    tier: "SMB",
    amount: 1250.00,
    status: "Failed",
    date: "2026-10-26 09:12",
    paymentMethod: "Credit Card",
    invoiceId: "INV-2026-877"
  },
  {
    id: "TX-94807",
    customer: "OmniHealth Solutions",
    contact: "d.wright@omnihealth.org",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    tier: "Enterprise",
    amount: 32000.00,
    status: "Completed",
    date: "2026-10-25 18:40",
    paymentMethod: "Wire Transfer",
    invoiceId: "INV-2026-876"
  },
  {
    id: "TX-94806",
    customer: "Kite Robotics Corp",
    contact: "leo.sato@kiterobotics.jp",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    tier: "Mid-Market",
    amount: 8900.00,
    status: "Refunded",
    date: "2026-10-25 16:15",
    paymentMethod: "Stripe",
    invoiceId: "INV-2026-875"
  }
];

export const ACTIVITY_FEED = [
  {
    id: "act-1",
    title: "AI Anomaly Detected",
    description: "Unusual 28% spike in Self-Serve conversion detected from North America campaign.",
    time: "12m ago",
    type: "ai",
    severity: "info"
  },
  {
    id: "act-2",
    title: "Contract Renewal Signed",
    description: "OmniHealth Solutions finalized annual Enterprise Tier contract ($32,000/yr).",
    time: "48m ago",
    type: "sales",
    severity: "success"
  },
  {
    id: "act-3",
    title: "Payment Gateway Latency Alert",
    description: "Credit card gateway timeout rate elevated to 1.8% during European peak hours.",
    time: "2h ago",
    type: "system",
    severity: "warning"
  },
  {
    id: "act-4",
    title: "Quarterly Forecast Updated",
    description: "NEXORA Neural Engine revised Q4 revenue projection upward by +6.4%.",
    time: "4h ago",
    type: "ai",
    severity: "info"
  },
  {
    id: "act-5",
    title: "New Team Member Invited",
    description: "Sarah Lin (Senior Data Analyst) added to Analytics workspace.",
    time: "6h ago",
    type: "user",
    severity: "neutral"
  }
];

export const AI_PRIMARY_INSIGHT = {
  headline: "Revenue acceleration driven by Enterprise Tier upgrades (+24.8% YoY)",
  summary: "Machine learning trend analysis indicates Q4 revenue is pacing 7.2% above baseline forecast. Main driver is expansion ARR in the Healthcare & FinTech segments.",
  confidence: 96.4,
  actionableSteps: [
    "Prioritize Mid-Market accounts showing >80% feature saturation for Enterprise upsell.",
    "Address recurring checkout drop-offs in the APAC region to capture an estimated $14,200 in monthly leakage.",
    "Automate re-engagement for 14 accounts flagged at mild churn risk."
  ],
  metricImpact: "+$84,000 Estimated ARR"
};

export const AI_INSIGHTS_LIST = [
  {
    id: "ins-101",
    category: "Revenue Acceleration",
    title: "Enterprise Multi-Seat Expansion Opportunity",
    impact: "High",
    confidence: 95,
    dateRange: "Oct 1 - Oct 26, 2026",
    source: "Stripe & Salesforce Pipeline Synchronization",
    observation: "18 Mid-Market accounts exceeded 90% seat allocation over 3 consecutive weeks.",
    recommendation: "Deploy automated account executive prompts offering tailored Enterprise Tier upgrades with dedicated SLA packages.",
    metricChange: "+$62,000 Potential ARR",
    tags: ["Sales", "Enterprise", "Upsell"]
  },
  {
    id: "ins-102",
    category: "Risk Mitigation",
    title: "APAC Payment Gateway Latency Risk",
    impact: "Medium",
    confidence: 89,
    dateRange: "Last 14 Days",
    source: "Payment Processing Telemetry (Logstash/Spring API)",
    observation: "Transactions routed through secondary APAC payment nodes showed a 4.2% timeout spike, resulting in 38 abandoned checkout sessions.",
    recommendation: "Enable smart retry routing and switch primary settlement node to Singapore AWS AP-Southeast gateway.",
    metricChange: "$14,500 Recoverable Volume",
    tags: ["Finance", "Infrastructure", "APAC"]
  },
  {
    id: "ins-103",
    category: "Customer Behavior",
    title: "AI-Assisted Features Drive 3.2x Higher LTV",
    impact: "High",
    confidence: 97,
    dateRange: "Trailing 90 Days",
    source: "Product Usage Analytics & User Telemetry",
    observation: "Cohorts actively using NEXORA's automated forecasting and conversational query tool have a 98.4% 90-day retention rate versus 79.1% for non-AI users.",
    recommendation: "Introduce interactive onboarding walkthrough highlighting the AI Business Assistant to all newly invited workspace members.",
    metricChange: "+24% Retention Boost",
    tags: ["Product", "Retention", "Growth"]
  },
  {
    id: "ins-104",
    category: "Cost Optimization",
    title: "Data Warehouse Query Optimization Opportunity",
    impact: "Low",
    confidence: 91,
    dateRange: "Current Billing Cycle",
    source: "MySQL & BigQuery Execution Plan Analyzer",
    observation: "Batch analytical queries during off-peak hours generate 32% redundant full table scans for static daily rollups.",
    recommendation: "Implement Redis query result caching with a 6-hour TTL on historical summary tables.",
    metricChange: "-18% Query Cloud Cost",
    tags: ["Engineering", "Database", "Efficiency"]
  }
];

export const ALL_CUSTOMERS = [
  {
    id: "CUST-001",
    name: "Starlight Dynamics",
    contactName: "Elena Rostova",
    email: "elena.rostova@starlight.com",
    phone: "+1 (415) 892-0192",
    country: "United States",
    status: "Active",
    tier: "Enterprise",
    totalSpent: 148500,
    ordersCount: 38,
    joinedDate: "2024-03-12",
    lastActive: "2026-10-26",
    healthScore: 98,
    churnRisk: "Low",
    industry: "Aerospace & Tech"
  },
  {
    id: "CUST-002",
    name: "Vanguard Tech Labs",
    contactName: "Marcus Chen",
    email: "marcus.chen@vanguard.io",
    phone: "+1 (206) 555-8910",
    country: "United States",
    status: "Active",
    tier: "Enterprise",
    totalSpent: 96400,
    ordersCount: 24,
    joinedDate: "2024-07-19",
    lastActive: "2026-10-26",
    healthScore: 94,
    churnRisk: "Low",
    industry: "Software & Cloud"
  },
  {
    id: "CUST-003",
    name: "Apex Financial Group",
    contactName: "Sarah Jenkins",
    email: "sarah.jenkins@apexfin.com",
    phone: "+44 20 7946 0912",
    country: "United Kingdom",
    status: "Active",
    tier: "Mid-Market",
    totalSpent: 42300,
    ordersCount: 16,
    joinedDate: "2025-01-10",
    lastActive: "2026-10-26",
    healthScore: 88,
    churnRisk: "Low",
    industry: "Financial Services"
  },
  {
    id: "CUST-004",
    name: "CloudSphere Global",
    contactName: "David Miller",
    email: "david.miller@cloudsphere.net",
    phone: "+1 (650) 412-9844",
    country: "United States",
    status: "Active",
    tier: "Mid-Market",
    totalSpent: 38900,
    ordersCount: 12,
    joinedDate: "2025-04-05",
    lastActive: "2026-10-26",
    healthScore: 82,
    churnRisk: "Medium",
    industry: "Telecommunications"
  },
  {
    id: "CUST-005",
    name: "Nexus Retail Systems",
    contactName: "Amara Kalu",
    email: "amara.k@nexusretail.co",
    phone: "+27 11 555 4912",
    country: "South Africa",
    status: "At-Risk",
    tier: "SMB",
    totalSpent: 12400,
    ordersCount: 9,
    joinedDate: "2025-08-20",
    lastActive: "2026-10-18",
    healthScore: 61,
    churnRisk: "High",
    industry: "E-Commerce"
  },
  {
    id: "CUST-006",
    name: "OmniHealth Solutions",
    contactName: "Dr. Diane Wright",
    email: "d.wright@omnihealth.org",
    phone: "+1 (312) 778-9001",
    country: "United States",
    status: "Active",
    tier: "Enterprise",
    totalSpent: 184000,
    ordersCount: 42,
    joinedDate: "2023-11-15",
    lastActive: "2026-10-25",
    healthScore: 99,
    churnRisk: "Low",
    industry: "Healthcare"
  },
  {
    id: "CUST-007",
    name: "Kite Robotics Corp",
    contactName: "Leo Sato",
    email: "leo.sato@kiterobotics.jp",
    phone: "+81 3 5555 0142",
    country: "Japan",
    status: "Inactive",
    tier: "Mid-Market",
    totalSpent: 28600,
    ordersCount: 8,
    joinedDate: "2024-09-30",
    lastActive: "2026-09-12",
    healthScore: 48,
    churnRisk: "High",
    industry: "Industrial Automation"
  },
  {
    id: "CUST-008",
    name: "BioGen Innovations",
    contactName: "Chloe Martin",
    email: "c.martin@biogeninno.fr",
    phone: "+33 1 42 68 55 00",
    country: "France",
    status: "Active",
    tier: "Enterprise",
    totalSpent: 112000,
    ordersCount: 29,
    joinedDate: "2024-05-18",
    lastActive: "2026-10-24",
    healthScore: 92,
    churnRisk: "Low",
    industry: "Biotechnology"
  },
  {
    id: "CUST-009",
    name: "Aura Logistics Group",
    contactName: "Henrik Lindqvist",
    email: "henrik@auralogistics.se",
    phone: "+46 8 123 4567",
    country: "Sweden",
    status: "Active",
    tier: "SMB",
    totalSpent: 16800,
    ordersCount: 14,
    joinedDate: "2025-06-12",
    lastActive: "2026-10-23",
    healthScore: 78,
    churnRisk: "Medium",
    industry: "Supply Chain"
  },
  {
    id: "CUST-010",
    name: "Solaris Clean Energy",
    contactName: "Rajesh Patel",
    email: "rajesh.p@solarisenergy.in",
    phone: "+91 22 2490 8800",
    country: "India",
    status: "Active",
    tier: "Mid-Market",
    totalSpent: 54000,
    ordersCount: 19,
    joinedDate: "2025-02-14",
    lastActive: "2026-10-26",
    healthScore: 91,
    churnRisk: "Low",
    industry: "Renewable Energy"
  }
];

export const CATEGORY_BREAKDOWN = [
  { category: "Analytics & ML", revenue: 485000, percentage: 37.8, orders: 4920 },
  { category: "Data Connectors", revenue: 312000, percentage: 24.3, orders: 3610 },
  { category: "Security & Governance", revenue: 264000, percentage: 20.5, orders: 2190 },
  { category: "Automated Reporting", revenue: 142000, percentage: 11.1, orders: 5120 },
  { category: "Support & Custom SLAs", revenue: 81920, percentage: 6.3, orders: 2589 }
];

export const AI_SUGGESTED_PROMPTS = [
  "Analyze my business performance this quarter.",
  "Why did revenue dip in August and how did we recover?",
  "Identify my best-performing customer segments and products.",
  "Suggest actionable strategies to increase net retention.",
  "Summarize key operational risks for the upcoming board meeting."
];

export const AI_MOCK_RESPONSES = {
  "default": `### Executive Performance Overview (Q4 2026)

Based on current authorized business telemetry:

- **Net Revenue**: **$1,284,920** (+14.2% MoM, +26.4% YoY)
- **Active Customers**: **4,892** across 4 primary global markets
- **Average Customer LTV**: **$48,600** (Enterprise: $148,000)
- **Gross Margin**: **82.4%**

#### Key Findings:
1. **Enterprise Momentum**: Enterprise subscriptions account for **42.6% of overall ARR**, expanding at 18.4% quarter-over-quarter.
2. **Expansion Levers**: Accounts using the AI-assisted automated queries exhibit a **98.4% retention rate** (vs 79.1% standard).
3. **APAC Expansion**: Asia-Pacific transaction volume jumped by 22%, though checkout timeout errors require infrastructure routing tweaks.

*Note: This insight was generated using NEXORA Neural Intelligence Engine in Simulated Demo Mode.*`,

  "analyze": `### Comprehensive Business Performance Analysis

Here is the multi-dimensional breakdown for the current operating period:

#### 1. Revenue Trajectory
| Metric | Current Period | Target | Variance | Trend |
|---|---|---|---|---|
| Monthly Recurring Revenue | $158,720 | $152,000 | +4.4% | Accelerating |
| Total Year-to-Date ARR | $1,284,920 | $1,200,000 | +7.1% | Exceeding |
| Blended Conversion Rate | 3.42% | 3.20% | +22 bps | Healthy |
| Churn Rate (Logo) | 0.92% | < 1.20% | -28 bps | Industry Leading |

#### 2. Strategic Strengths
- **High Retention Cohorts**: Healthcare & Life Sciences clients demonstrate **112% Net Revenue Retention (NRR)**.
- **Organic Virality**: Self-serve conversions grew **+22.5%** without additional acquisition ad spend.

#### 3. Recommended Actions
- Allocate additional solutions architect bandwidth to Mid-Market upsell pipelines.
- Standardize multi-year enterprise contracts with tiered discount schedules.`,

  "dip": `### Root Cause Analysis: August Revenue Variance

Our anomaly diagnostic model completed a retrospective scan of August transaction records:

#### Primary Contributing Factors:
1. **Seasonal Enterprise Billing Cycle (-$12,400 impact)**:
   - Several European enterprise accounts operate on July/September budget renewals, creating a standard seasonal slowdown in mid-August.
2. **Infrastructure Migration Pause (-$4,800 impact)**:
   - A scheduled database connector migration on August 14th resulted in an 8-hour freeze on instant self-serve tier upgrades.
3. **Recovery Performance in September & October**:
   - Deferred contract closures rolled forward into September, triggering a **+$15,600 rebound** followed by **+$149,800** in record sales.

**Conclusion**: The temporary contraction was structural and fully corrected in Q3 close. No ongoing churn anomaly was detected.`,

  "best": `### Top Performing Customer Segments & Product Offerings

#### Segment Ranking by Net Contribution:
1. **Enterprise Tier ($548,000 | 42.6% Share)**
   - Highest margin (86%)
   - Lowest churn (0.4% annually)
   - Anchor clients: OmniHealth Solutions, Starlight Dynamics
2. **Mid-Market ($382,000 | 29.7% Share)**
   - Fastest expansion rate (+18.4% QoQ)
   - Highest feature adoption speed
3. **Self-Serve Pro ($130,920 | 10.3% Share)**
   - Low CAC ($42 blended)
   - Efficient pipeline feeder for outbound sales

#### Top Product Suites:
- **NEXORA Analytics & ML**: Generates 37.8% of total platform billing.
- **Enterprise Data Connectors**: 24.3% of revenue, strong attach rate with BigQuery and Snowflake users.`,

  "strategies": `### 5 High-Impact Strategies to Accelerate Revenue Growth

1. **Activate Automated Seat-Utilization Expansion Triggers**
   - *Impact*: Estimated **+$85,000 ARR**
   - *Action*: Prompt admins when 85% of seat licenses are actively utilized for 14+ days.

2. **Package AI Intelligence as a Tiered Premium Add-on**
   - *Impact*: Estimated **+12% Average Revenue Per User (ARPU)**
   - *Action*: Offer unlimited automated forecasting and executive summary reports as an advanced tier feature.

3. **Deploy Smart Geolocation Payment Routing for APAC**
   - *Impact*: Estimated **+$14,200 Monthly Recovered ARR**
   - *Action*: Integrate local settlement gateways in Singapore, Tokyo, and Sydney.

4. **Institutionalize Customer Health Scoring Workflows**
   - *Impact*: Reduces Mid-Market churn from 1.4% to < 0.8%.
   - *Action*: Flag accounts like *Nexus Retail Systems* (Health Score: 61) for proactive CSM outreach.

5. **Launch Product-Led Free Trial Extensions**
   - *Action*: Automatically grant 7 extra trial days to users who create at least 3 custom dashboard charts.`,

  "summarize": `### Executive Monthly Summary — October 2026

- **Topline Revenue**: **$158,720** (Record monthly high, +5.9% over September)
- **New Bookings**: **$38,400** in new contract commitments
- **Customer Acquisition**: +142 net new accounts
- **Operational Uptime**: **99.98%** availability across API clusters
- **Key Win**: Successfully on-boarded **BioGen Innovations** on multi-region enterprise setup.

**Verdict**: All core targets for October achieved ahead of schedule. On track to exceed FY26 annual guidance by 8.4%.`
};
