import { useState, useEffect } from 'react'
import './App.css'
import { fundingGuide } from './fundingGuide.js'

// Scholarship database - Academic Achievement Focus
const scholarships = [
  // ========== NATIONAL MERIT & PRESIDENTIAL ==========
  {
    id: 1,
    name: "National Merit $2,500 Scholarship",
    amount: 2500,
    deadline: "2026-02-01",
    requirements: "PSAT/NMSQT score 140+ (varies by state), Finalist status",
    field: "Any",
    residency: "US Citizen",
    url: "https://www.nationalmerit.org/",
    tips: "Score in top 1% on PSAT. Entry is automatic - no application needed."
  },
  {
    id: 2,
    name: "Coca-Cola Scholars Foundation",
    amount: 20000,
    deadline: "2026-10-31",
    requirements: "3.0 GPA unweighted, leadership, community service",
    field: "Any",
    residency: "US Citizen",
    url: "https://www.coca-colascholarsfoundation.org/",
    tips: "Focus on leadership impact. Get strong letters of recommendation early."
  },
  {
    id: 3,
    name: "National Merit Corporate Scholarships",
    amount: 5000,
    deadline: "2026-02-01",
    requirements: "National Merit Finalist, corporate-specific criteria",
    field: "Varies",
    residency: "US",
    url: "https://www.nationalmerit.org/scholarships/",
    tips: "Many corporations sponsor NMF. Apply to multiple corporate scholarships."
  },
  {
    id: 4,
    name: "National Merit College-Sponsored",
    amount: "Varies",
    deadline: "2026-02-01",
    requirements: "National Merit Finalist, college sponsor list",
    field: "Any",
    residency: "US",
    url: "https://www.nationalmerit.org/scholarships/",
    tips: " Colleges compete for finalists. List them early in your application."
  },
  {
    id: 5,
    name: "Presidential Scholars (US Presidential Scholars)",
    amount: "Full Ride",
    deadline: "2026-02-15",
    requirements: "Top academic performer, nomination required",
    field: "Any",
    residency: "US Citizen",
    url: "https://presidentialscholars.org/",
    tips: "One of most prestigious. Requires nomination from Congressman or educator."
  },

  // ========== HIGH GPA / ACADEMIC EXCELLENCE ==========
  {
    id: 6,
    name: "Jack Kent Cooke Foundation Scholarship",
    amount: 40000,
    deadline: "2026-01-12",
    requirements: "3.5+ GPA, financial need, exceptional academics",
    field: "Any",
    residency: "US/Canada",
    url: "https://www.jkcf.org/",
    tips: "Academic excellence + financial need. Show passion for learning."
  },
  {
    id: 7,
    name: "Dell Scholars Program",
    amount: 20000,
    deadline: "2026-01-15",
    requirements: "Pell Grant eligible, 2.5+ GPA, demonstrated perseverance",
    field: "Any",
    residency: "US",
    url: "https://www.dellscholars.org/",
    tips: "Emphasize perseverance. Show how college changes your trajectory."
  },
  {
    id: 8,
    name: "Gates Scholarship",
    amount: "Full Ride",
    deadline: "2026-04-15",
    requirements: "3.3+ GPA, low income, underrepresented minority",
    field: "Any",
    residency: "US",
    url: "https://www.gatesscholarship.org/",
    tips: "Focus on overcoming adversity. Show resilience and leadership."
  },
  {
    id: 9,
    name: "Elks National Foundation Most Valuable Student",
    amount: 15000,
    deadline: "2026-04-01",
    requirements: "US citizenship, financial need, 3.0+ GPA",
    field: "Any",
    residency: "US",
    url: "https://www.elks.org/scholarships/",
    tips: "Financial need is key factor. Be honest about circumstances."
  },
  {
    id: 10,
    name: "Horizon Awards (Gates Millennium)",
    amount: "Full Ride",
    deadline: "2026-01-10",
    requirements: "3.0 GPA, African American, Hispanic, Native American, or Asian Pacific Islander",
    field: "Any",
    residency: "US",
    url: "https://www.horizonawards.org/",
    tips: "Focus on community service and leadership. Show commitment."
  },

  // ========== STEM / ENGINEERING ==========
  {
    id: 11,
    name: "Barry Goldwater Scholarship",
    amount: 7500,
    deadline: "2026-02-01",
    requirements: "3.0+ GPA, research experience, STEM major",
    field: "STEM",
    residency: "US",
    url: "https://goldwaterscholarship.gov/",
    tips: "Need research experience. Start building portfolio early in college."
  },
  {
    id: 12,
    name: "NVIDIA Scholarship",
    amount: 10000,
    deadline: "2026-03-01",
    requirements: "3.5+ GPA, CS/Engineering major, financial need",
    field: "Computer Science/Engineering",
    residency: "US/Canada",
    url: "https://nvidiascholarships.com/",
    tips: "Show passion for tech. Open source contributions help."
  },
  {
    id: 13,
    name: "AFCEA Merit Scholarship",
    amount: 5000,
    deadline: "2026-02-15",
    requirements: "3.0+ GPA, STEM major, US citizen",
    field: "STEM (Defense/Cyber)",
    residency: "US Citizen",
    url: "https://www.afcea.org/scholarships",
    tips: "Interest in national security helps. Show leadership in STEM."
  },
  {
    id: 14,
    name: "Google Lime Scholarship",
    amount: 10000,
    deadline: "2026-02-15",
    requirements: "Computer Science, disability (or ally)",
    field: "Computer Science",
    residency: "US/Canada",
    url: "https://buildyourfuture.withgoogle.com/scholarships/lime",
    tips: "Focus on tech skills and making an impact in CS field."
  },
  {
    id: 15,
    name: "Microsoft Scholarship",
    amount: 5000,
    deadline: "2026-02-15",
    requirements: "3.0+ GPA, STEM major, demonstrated need",
    field: "STEM",
    residency: "US",
    url: "https://www.microsoft.com/en-us/scholarships",
    tips: "Show passion for technology. Internships help."
  },

  // ========== UNDERREPRESENTED GROUPS ==========
  {
    id: 16,
    name: "Ron Brown Scholarship",
    amount: 40000,
    deadline: "2026-01-09",
    requirements: "African American, financial need, leadership potential",
    field: "Any",
    residency: "US",
    url: "https://www.ronbrown.org/",
    tips: "Focus on community impact. Show commitment to helping others."
  },
  {
    id: 17,
    name: "UNCF Scholarships",
    amount: 5000,
    deadline: "Varies",
    requirements: "African American, 2.5+ GPA, financial need",
    field: "Any",
    residency: "US",
    url: "https://scholarships.uncf.org/",
    tips: "Apply to multiple UNCF scholarships. One application = many awards."
  },
  {
    id: 18,
    name: "Hispanic Scholarship Fund",
    amount: 5000,
    deadline: "2026-02-15",
    requirements: "Hispanic/Latino, 2.5+ GPA, US Citizen",
    field: "Any",
    residency: "US Citizen",
    url: "https://www.hsf.net/",
    tips: "Emphasize heritage and community. Show leadership in Latino community."
  },
  {
    id: 19,
    name: "APIASF Scholarship",
    amount: 5000,
    deadline: "2026-01-15",
    requirements: "Asian American/Pacific Islander, 2.7+ GPA",
    field: "Any",
    residency: "US",
    url: "https://www.apiasf.org/",
    tips: "Show leadership in API community. Focus on cultural identity."
  },
  {
    id: 20,
    name: "Turkish American Association",
    amount: 2500,
    deadline: "2026-03-01",
    requirements: "Turkish heritage or US citizen of Turkish descent",
    field: "Any",
    residency: "US",
    url: "https://taascholarship.org/",
    tips: "Community involvement important. Show Turkish heritage pride."
  },

  // ========== LEADERSHIP & SERVICE ==========
  {
    id: 21,
    name: "AXA Achievement Scholarship",
    amount: 10000,
    deadline: "2026-12-01",
    requirements: "Community service, leadership, 3.0+ GPA",
    field: "Any",
    residency: "US Citizen/Legal Resident",
    url: "https://www.axa-achievement.com/",
    tips: "Tell a compelling story about how you made a difference."
  },
  {
    id: 22,
    name: "Boy Scouts of America Scholarship",
    amount: 5000,
    deadline: "2026-03-01",
    requirements: "Eagle Scout, 3.0+ GPA",
    field: "Any",
    residency: "US",
    url: "https://www.scouting.org/",
    tips: "Eagle Scout demonstrates leadership. Focus on service projects."
  },
  {
    id: 23,
    name: "Circle of Service Scholarship",
    amount: 2500,
    deadline: "2026-02-01",
    requirements: "100+ hours community service, 3.0+ GPA",
    field: "Any",
    residency: "US",
    url: "https://www.circleofservice.org/",
    tips: "Document all service hours. Show sustained community involvement."
  },

  // ========== ATHLETIC ==========
  {
    id: 24,
    name: "NCAA Division I Scholarships",
    amount: "Full Tuition",
    deadline: "Varies",
    requirements: "Athletic ability, NCAA eligibility, admissions",
    field: "Any",
    residency: "US",
    url: "https://www.ncaa.org/",
    tips: "Contact coaches early. Video highlights crucial."
  },
  {
    id: 25,
    name: "NAIA Scholarships",
    amount: "Varies",
    deadline: "Varies",
    requirements: "Athletic ability, NAIA eligibility",
    field: "Any",
    residency: "US",
    url: "https://www.naia.org/",
    tips: "Less competitive than NCAA. Good option for mid-level athletes."
  },

  // ========== STATE-SPECIFIC (TEXAS) ==========
  {
    id: 26,
    name: "Texas Public Education Grant",
    amount: 7000,
    deadline: "2026-03-01",
    requirements: "Texas resident, FAFSA, 2.5+ GPA",
    field: "Any",
    residency: "Texas",
    url: "https://www.highered.texas.gov/",
    tips: "Complete FAFSA early. Priority goes to early filers."
  },
  {
    id: 27,
    name: "Texas High School Program",
    amount: "Tuition",
    deadline: "2026-02-01",
    requirements: "Top 10% of HS class, Texas residency",
    field: "Any",
    residency: "Texas",
    url: "https://www.texas.gov/",
    tips: "Automatic admission to UT Austin for top 10%."
  },
  {
    id: 28,
    name: "Texas Armed Forces Scholarship",
    amount: "Full Tuition + Stipend",
    deadline: "2026-04-01",
    requirements: "Military service commitment, Texas resident",
    field: "Any",
    residency: "Texas",
    url: "https://www.texas.gov/",
    tips: "ROTC commitment required. Strong interview matters."
  },

  // ========== CREATIVE / ARTS ==========
  {
    id: 29,
    name: "Young Artists Scholarship",
    amount: 5000,
    deadline: "2026-03-15",
    requirements: "Portfolio submission, 3.0+ GPA",
    field: "Arts/Music",
    residency: "US",
    url: "https://www.scholartips.com/",
    tips: "Strong portfolio essential. Show growth and unique voice."
  },
  {
    id: 30,
    name: "National Art Honor Society",
    amount: 1000,
    deadline: "2026-02-01",
    requirements: "NAHS member, art portfolio",
    field: "Visual Arts",
    residency: "US",
    url: "https://www.arteducators.org/",
    tips: "Document your artistic journey. Show commitment to art."
  }
]

// Success criteria library
const successCriteria = [
  {
    category: "Essays",
    tips: [
      "Start early - give yourself 3+ weeks",
      "Tell a personal story, not achievements list",
      "Show vulnerability and growth",
      "Have 2-3 people review each essay",
      "Tailor essay to scholarship values",
      "Avoid generic openings"
    ]
  },
  {
    category: "Letters of Recommendation",
    tips: [
      "Ask teachers who know you well, not just your best grades",
      "Give recommenders 4+ weeks notice",
      "Provide resume and key achievements",
      "Waive right to see letter (more credible)",
      "Ask in person, not email"
    ]
  },
  {
    category: "Extracurriculars",
    tips: [
      "Quality over quantity - show depth, not breadth",
      "Leadership roles matter more than participation",
      "Show sustained commitment (3+ years)",
      "Connect activities to your story",
      "Don't pad - be honest about hours"
    ]
  },
  {
    category: "Financial Need",
    tips: [
      "Complete FAFSA as soon as possible",
      "Don't assume you won't qualify",
      "Provide accurate income information",
      "Explain special circumstances",
      "Many scholarships require FAFSA"
    ]
  },
  {
    category: "Interview",
    tips: [
      "Research the organization first",
      "Practice common questions out loud",
      "Prepare 3-5 questions to ask them",
      "Dress professionally even for virtual",
      "Send thank you note within 24 hours"
    ]
  }
]

// Application status options
const statuses = ['Not Started', 'In Progress', 'Submitted', 'Accepted', 'Rejected']

function App() {
  const [activeTab, setActiveTab] = useState('search')
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('scholarProfile')
    return saved ? JSON.parse(saved) : {
      name: '',
      gpa: '',
      sat: '',
      major: '',
      state: 'TX',
      income: '',
      ethnicity: ''
    }
  })
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('scholarApps')
    return saved ? JSON.parse(saved) : {}
  })
  const [filters, setFilters] = useState({ amount: 'all', deadline: 'all', gpa: 'all', field: 'all' })
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    localStorage.setItem('scholarProfile', JSON.stringify(profile))
    localStorage.setItem('scholarApps', JSON.stringify(applications))
  }, [profile, applications])

  const filteredScholarships = scholarships.filter(s => {
    if (filters.amount === 'high' && s.amount < 5000) return false
    if (filters.amount === 'medium' && (s.amount < 1000 || s.amount >= 5000)) return false
    if (filters.amount === 'low' && s.amount >= 1000) return false
    if (filters.field !== 'all' && !s.field.toLowerCase().includes(filters.field.toLowerCase())) return false
    return true
  })

  const tabs = [
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'tracker', label: 'Tracker', icon: '📋' },
    { id: 'funding', label: 'Funding', icon: '💰' },
    { id: 'tips', label: 'Tips', icon: '💡' }
  ]

  return (
    <div className="app">
      <header className="header">
        <div className="logo">🎓 ScholarQuest</div>
        <nav className="nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {activeTab === 'search' && (
          <SearchTab 
            scholarships={filteredScholarships} 
            filters={filters}
            setFilters={setFilters}
            setSelected={setSelected}
            applications={applications}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileTab profile={profile} setProfile={setProfile} />
        )}
        {activeTab === 'tracker' && (
          <TrackerTab 
            scholarships={scholarships} 
            applications={applications}
            setApplications={setApplications}
          />
        )}
        {activeTab === 'funding' && (
          <FundingTab />
        )}
        {activeTab === 'tips' && (
          <TipsTab criteria={successCriteria} />
        )}
      </main>

      {selected && (
        <ScholarshipModal 
          scholarship={selected} 
          onClose={() => setSelected(null)}
          status={applications[selected.id]?.status}
          notes={applications[selected.id]?.notes}
          onApply={(status, notes) => {
            setApplications(prev => ({
              ...prev,
              [selected.id]: { status, notes, updated: new Date().toISOString() }
            }))
            setSelected(null)
          }}
        />
      )}
    </div>
  )
}

function SearchTab({ scholarships, filters, setFilters, setSelected, applications }) {
  const [search, setSearch] = useState('')

  const filtered = scholarships.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.field.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="tab-content">
      <div className="search-header">
        <h1>Find Scholarships</h1>
        <div className="search-filters">
          <input 
            type="text" 
            placeholder="Search scholarships..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select value={filters.amount} onChange={(e) => setFilters({...filters, amount: e.target.value})}>
            <option value="all">Any Amount</option>
            <option value="high">$5,000+</option>
            <option value="medium">$1,000 - $5,000</option>
            <option value="low">Under $1,000</option>
          </select>
          <select value={filters.field} onChange={(e) => setFilters({...filters, field: e.target.value})}>
            <option value="all">Any Field</option>
            <option value="stem">STEM</option>
            <option value="business">Business</option>
            <option value="arts">Arts</option>
            <option value="any">General/Any</option>
          </select>
        </div>
      </div>

      <div className="scholarship-list">
        {filtered.map(s => (
          <div key={s.id} className="scholarship-card">
            <div className="scholarship-header">
              <h3>{s.name}</h3>
              <span className="amount">{typeof s.amount === 'number' ? `$${s.amount.toLocaleString()}` : s.amount}</span>
            </div>
            <p className="requirements">{s.requirements}</p>
            <div className="scholarship-meta">
              <span>📅 Due: {s.deadline}</span>
              <span>📍 {s.residency}</span>
            </div>
            {applications[s.id]?.status && (
              <div className={`status-badge ${applications[s.id].status.toLowerCase().replace(' ', '-')}`}>
                {applications[s.id].status}
              </div>
            )}
            <button className="btn-primary" onClick={() => setSelected(s)}>
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfileTab({ profile, setProfile }) {
  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value })
  }

  return (
    <div className="tab-content">
      <h1>Your Profile</h1>
      <p className="subtitle">Complete your profile to get matched with relevant scholarships</p>

      <div className="profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>GPA (0-4.0)</label>
            <input 
              type="number" 
              step="0.01"
              value={profile.gpa}
              onChange={(e) => handleChange('gpa', e.target.value)}
              placeholder="3.5"
            />
          </div>
          <div className="form-group">
            <label>SAT Score</label>
            <input 
              type="number" 
              value={profile.sat}
              onChange={(e) => handleChange('sat', e.target.value)}
              placeholder="1400"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Intended Major</label>
            <select value={profile.major} onChange={(e) => handleChange('major', e.target.value)}>
              <option value="">Select major</option>
              <option value="stem">STEM</option>
              <option value="business">Business</option>
              <option value="arts">Arts & Humanities</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="undecided">Undecided</option>
            </select>
          </div>
          <div className="form-group">
            <label>State of Residence</label>
            <select value={profile.state} onChange={(e) => handleChange('state', e.target.value)}>
              <option value="TX">Texas</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="FL">Florida</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Annual Household Income (Optional)</label>
          <select value={profile.income} onChange={(e) => handleChange('income', e.target.value)}>
            <option value="">Select range</option>
              <option value="0-25000">$0 - $25,000</option>
              <option value="25001-50000">$25,001 - $50,000</option>
              <option value="50001-75000">$50,001 - $75,000</option>
              <option value="75001-100000">$75,001 - $100,000</option>
              <option value="100000+">$100,000+</option>
          </select>
        </div>

        <div className="save-notice">
          ✅ Profile saved automatically
        </div>
      </div>
    </div>
  )
}

function TrackerTab({ scholarships, applications, setApplications }) {
  const appList = Object.entries(applications)

  return (
    <div className="tab-content">
      <h1>Application Tracker</h1>
      <p className="subtitle">Track your scholarship applications</p>

      {appList.length === 0 ? (
        <div className="empty-state">
          <p>No applications tracked yet.</p>
          <p>Go to Search to find scholarships!</p>
        </div>
      ) : (
        <div className="tracker-list">
          {appList.map(([id, app]) => {
            const scholarship = scholarships.find(s => s.id === parseInt(id))
            if (!scholarship) return null
            return (
              <div key={id} className="tracker-card">
                <div className="tracker-header">
                  <h3>{scholarship.name}</h3>
                  <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                    {app.status}
                  </span>
                </div>
                <p className="due-date">Due: {scholarship.deadline}</p>
                {app.notes && <p className="notes">Notes: {app.notes}</p>}
                <div className="tracker-actions">
                  <select 
                    value={app.status}
                    onChange={(e) => setApplications(prev => ({
                      ...prev,
                      [id]: { ...prev[id], status: e.target.value }
                    }))}
                  >
                    {statuses.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      const newApps = { ...applications }
                      delete newApps[id]
                      setApplications(newApps)
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="tracker-stats">
        <div className="stat">
          <span className="stat-num">{appList.length}</span>
          <span className="stat-label">Tracked</span>
        </div>
        <div className="stat">
          <span className="stat-num">{appList.filter(([_,a]) => a.status === 'Submitted').length}</span>
          <span className="stat-label">Submitted</span>
        </div>
        <div className="stat">
          <span className="stat-num">{appList.filter(([_,a]) => a.status === 'Accepted').length}</span>
          <span className="stat-label">Accepted</span>
        </div>
      </div>
    </div>
  )
}

function FundingTab() {
  return (
    <div className="tab-content">
      <h1>💰 Complete College Funding Guide</h1>
      <p className="subtitle">Grants, scholarships, and strategies to fund your education</p>

      <div className="funding-section">
        <h2>🎯 The Funding Stack</h2>
        <div className="funding-stack">
          <div className="stack-item">🎓 Scholarships - "Free money" - merit & niche</div>
          <div className="stack-item">📦 Grants - "Free money" - need-based</div>
          <div className="stack-item">🏛️ Federal Aid (FAFSA) - Loans + Pell</div>
          <div className="stack-item">� Texas State Aid - TPEG, TEXAS Grant</div>
          <div className="stack-item">💼 Work-Study - Part-time work</div>
          <div className="stack-item">🏫 College Grants - Institution-specific</div>
        </div>
      </div>

      <div className="funding-section">
        <h2>🏛️ Federal Grants</h2>
        <div className="grant-card">
          <h3>Pell Grant</h3>
          <p><strong>Up to:</strong> $7,395/year</p>
          <p><strong>Who:</strong> Undergrads with financial need</p>
          <p><strong>Key:</strong> File FAFSA ASAP!</p>
        </div>
        <div className="grant-card">
          <h3>FSEOG</h3>
          <p><strong>Up to:</strong> $4,000</p>
          <p><strong>Who:</strong> Exceptional need</p>
          <p><strong>Key:</strong> First-come, first-served!</p>
        </div>
      </div>

      <div className="funding-section">
        <h2>�Texas State Grants</h2>
        <div className="grant-card">
          <h3>Texas Grant (TEXAS)</h3>
          <p><strong>Up to:</strong> $8,000/year</p>
          <p><strong>Deadline:</strong> March 1</p>
        </div>
        <div className="grant-card">
          <h3>Hazlewood Act</h3>
          <p><strong>Benefit:</strong> Free tuition + fees</p>
          <p><strong>Who:</strong> Texas veterans</p>
        </div>
      </div>

      <div className="funding-section">
        <h2>📋 Scholarship Strategies</h2>
        <ul className="strategy-list">
          <li><strong>Apply to 20-50+ scholarships</strong> - Numbers game!</li>
          <li><strong>Focus on local</strong> - Less competition</li>
          <li><strong>Don't skip $500</strong> - 10 x $500 = $5,000</li>
          <li><strong>Start junior year</strong> - Get a head start</li>
          <li><strong>Customize essays</strong> - One size doesn't fit all</li>
          <li><strong>Appeal financial aid</strong> - If circumstances changed</li>
        </ul>
      </div>

      <div className="funding-section">
        <h2>🔗 Free Scholarship Databases</h2>
        <div className="db-list">
          <a href="https://www.fastweb.com" target="_blank" className="db-link">Fastweb</a>
          <a href="https://www.scholarships.com" target="_blank" className="db-link">Scholarships.com</a>
          <a href="https://studentaid.gov" target="_blank" className="db-link">Federal Student Aid</a>
          <a href="https://www.collegeboard.org" target="_blank" className="db-link">College Board</a>
        </div>
      </div>

      <div className="funding-section">
        <h2>📅 Timeline</h2>
        <div className="timeline-simple">
          <div><strong>Junior Year Spring:</strong> Start scholarship search</div>
          <div><strong>Junior Summer:</strong> Write essays, visit colleges</div>
          <div><strong>Senior Fall:</strong> Complete FAFSA Oct 1, apply to scholarships</div>
          <div><strong>Senior Winter:</strong> Review financial aid offers</div>
          <div><strong>Senior Spring:</strong> Compare packages, make decision</div>
        </div>
      </div>
    </div>
  )
}

function TipsTab({ criteria }) {
  return (
    <div className="tab-content">
      <h1>Success Tips</h1>
      <p className="subtitle">Learn what makes applications successful</p>

      {criteria.map((section, i) => (
        <div key={i} className="tips-section">
          <h2>{section.category}</h2>
          <ul>
            {section.tips.map((tip, j) => (
              <li key={j}>{tip}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="timeline-section">
        <h2>📅 Application Timeline</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span className="timeline-date">Junior Year - Spring</span>
            <p>Start researching scholarships. Build resume.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-date">Junior Year - Summer</span>
            <p>Visit colleges. Start essay drafts.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-date">Senior Year - Fall</span>
            <p>Finalize essays. Ask for recommendations. Apply early.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-date">Senior Year - Winter</span>
            <p>Submit applications. Complete FAFSA.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-date">Senior Year - Spring</span>
            <p>Compare offers. Make decisions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScholarshipModal({ scholarship, onClose, status, notes, onApply }) {
  const [appStatus, setAppStatus] = useState(status || 'Not Started')
  const [appNotes, setAppNotes] = useState(notes || '')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>{scholarship.name}</h2>
        <div className="modal-amount">
          {typeof scholarship.amount === 'number' ? `$${scholarship.amount.toLocaleString()}` : scholarship.amount}
        </div>

        <div className="modal-section">
          <h4>📅 Deadline</h4>
          <p>{scholarship.deadline}</p>
        </div>

        <div className="modal-section">
          <h4>📋 Requirements</h4>
          <p>{scholarship.requirements}</p>
        </div>

        <div className="modal-section">
          <h4>📍 Eligibility</h4>
          <p>{scholarship.residency}</p>
        </div>

        <div className="modal-section">
          <h4>💡 Success Tips</h4>
          <p>{scholarship.tips}</p>
        </div>

        <a href={scholarship.url} target="_blank" rel="noopener" className="btn-link">
          Visit Website →
        </a>

        <div className="modal-section">
          <h4>📝 Track Application</h4>
          <select value={appStatus} onChange={(e) => setAppStatus(e.target.value)}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <textarea 
            placeholder="Add notes..." 
            value={appNotes}
            onChange={(e) => setAppNotes(e.target.value)}
          />
          <button className="btn-primary" onClick={() => onApply(appStatus, appNotes)}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
