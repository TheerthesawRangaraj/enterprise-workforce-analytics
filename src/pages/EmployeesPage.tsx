import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Grid as GridIcon, List, Mail, MapPin, Award, ShieldAlert } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { EmployeeDetailModal } from '../components/employees/EmployeeDetailModal';
import { mockEmployees } from '../data/mockData';
import { Employee } from '../types';

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Add Employee Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState('Engineering');

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.skills.some((s) => s.name.toLowerCase().includes(search.toLowerCase()));

    const matchesDept = deptFilter === 'All' || e.department === deptFilter;
    const matchesRisk = riskFilter === 'All' || e.riskLevel === riskFilter;

    return matchesSearch && matchesDept && matchesRisk;
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      name: newName,
      email: newEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: newRole || 'Software Engineer',
      department: newDept,
      location: 'San Jose, CA',
      tenureMonths: 1,
      overallRiskScore: 25,
      riskLevel: 'Low',
      flightRisk: 20,
      skillShortageRisk: 30,
      burnoutIndex: 25,
      assignedManager: 'Marcus Vance',
      joinDate: new Date().toISOString().split('T')[0],
      performanceRating: 4.5,
      projectsActive: 1,
      suggestedAction: 'Complete standard technical onboarding track',
      skills: [
        { id: `sk-${Date.now()}-1`, name: 'TypeScript', category: 'Frontend', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-08-10', verified: true },
        { id: `sk-${Date.now()}-2`, name: 'React', category: 'Frontend', currentLevel: 3, requiredLevel: 4, lastAssessed: '2026-08-10', verified: true }
      ],
      riskFactors: []
    };

    setEmployees([newEmp, ...employees]);
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewRole('');
  };

  const handleExportCSV = () => {
    const headers = ['ID,Name,Email,Role,Department,RiskLevel,OverallRiskScore,FlightRisk'];
    const rows = filtered.map(
      (e) => `"${e.id}","${e.name}","${e.email}","${e.role}","${e.department}","${e.riskLevel}",${e.overallRiskScore},${e.flightRisk}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `skillmatrix_employees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Bar */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Skill Directory</h1>
          <p className="page-subtitle">Manage workforce talent profiles, verify skills, and track individual risk scores.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filter & View Mode Bar */}
      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="search-input"
            style={{ width: '100%', paddingLeft: '2.5rem' }}
            placeholder="Search by name, role, or technical skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Cloud Infrastructure">Cloud Infrastructure</option>
          <option value="AI & Data Science">AI & Data Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Security & Compliance">Security & Compliance</option>
          <option value="Product & Design">Product & Design</option>
        </select>

        <select className="filter-select" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
          <option value="All">All Risk Levels</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '0.2rem' }}>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: viewMode === 'table' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'table' ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'grid' ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            <GridIcon size={18} />
          </button>
        </div>
      </div>

      {/* Main View Display */}
      {viewMode === 'table' ? (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Role & Dept</th>
                <th>Overall Risk</th>
                <th>Flight Risk</th>
                <th>Key Verified Skills</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedEmployee(emp)}>
                  <td>
                    <div className="user-info-cell">
                      <img src={emp.avatar} alt={emp.name} className="avatar-img" />
                      <div>
                        <div style={{ fontWeight: 700 }}>{emp.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{emp.role}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>{emp.department}</div>
                  </td>
                  <td>
                    <Badge level={emp.riskLevel}>{emp.overallRiskScore}% ({emp.riskLevel})</Badge>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: emp.flightRisk > 70 ? 'var(--risk-critical)' : 'var(--text-primary)' }}>
                      {emp.flightRisk}%
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {emp.skills.slice(0, 3).map((s) => (
                        <span key={s.id} style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                          {s.name} (L{s.currentLevel})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedEmployee(emp); }}>
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((emp) => (
            <div key={emp.id} className="card" style={{ cursor: 'pointer' }} onClick={() => setSelectedEmployee(emp)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img src={emp.avatar} alt={emp.name} className="avatar-img" style={{ width: '54px', height: '54px' }} />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{emp.name}</h3>
                  <div style={{ fontSize: '0.825rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{emp.role}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.department}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Overall Risk</div>
                  <Badge level={emp.riskLevel}>{emp.overallRiskScore}%</Badge>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flight Risk</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: emp.flightRisk > 70 ? 'var(--risk-critical)' : 'var(--text-primary)' }}>{emp.flightRisk}%</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                {emp.skills.slice(0, 3).map((s) => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{s.name}</span>
                    <span style={{ fontWeight: 700 }}>L{s.currentLevel} / L{s.requiredLevel}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Employee */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Employee Profile">
        <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Full Name</label>
            <input type="text" required className="search-input" placeholder="e.g. Marcus Vance" value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Email Address</label>
            <input type="email" required className="search-input" placeholder="m.vance@techcorp.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Role Title</label>
            <input type="text" required className="search-input" placeholder="Senior Backend Developer" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Department</label>
            <select className="filter-select" style={{ width: '100%' }} value={newDept} onChange={(e) => setNewDept(e.target.value)}>
              <option value="Engineering">Engineering</option>
              <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Security & Compliance">Security & Compliance</option>
              <option value="Product & Design">Product & Design</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Employee Profile</button>
          </div>
        </form>
      </Modal>

      {/* Employee Inspection Modal */}
      <EmployeeDetailModal employee={selectedEmployee} isOpen={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} />
    </div>
  );
};
