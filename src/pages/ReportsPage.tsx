import React, { useState } from 'react';
import { FileText, Download, Printer, Plus, CheckCircle2, Calendar } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { mockReports } from '../data/mockData';
import { ReportItem } from '../types';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(mockReports);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [reportType, setReportType] = useState<'Skill Audit' | 'Risk Summary' | 'Training Needs' | 'Executive Brief'>('Skill Audit');
  const [format, setFormat] = useState<'PDF' | 'CSV'>('PDF');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newRep: ReportItem = {
      id: `rep-${Date.now()}`,
      title: title || `${reportType} - ${new Date().toISOString().slice(0, 10)}`,
      type: reportType,
      generatedDate: new Date().toISOString().split('T')[0],
      author: 'Current User',
      format,
      size: '2.4 MB',
      status: 'Ready'
    };

    setReports([newRep, ...reports]);
    setIsGenerateOpen(false);
    setTitle('');
  };

  const handleDownload = (rep: ReportItem) => {
    const dummyContent = `SkillMatrix AI Report: ${rep.title}\nType: ${rep.type}\nGenerated Date: ${rep.generatedDate}\nAuthor: ${rep.author}\nStatus: Verified Complete`;
    const element = document.createElement('a');
    const file = new Blob([dummyContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${rep.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${rep.format.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Reports & Audit Generator</h1>
          <p className="page-subtitle">Export compliance-ready audit summaries, skill vulnerability reports, and training needs analysis.</p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsGenerateOpen(true)}>
          <Plus size={16} />
          <span>Generate New Audit Report</span>
        </button>
      </div>

      {/* Archived Reports Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText color="var(--accent-primary)" size={20} />
            <span>Generated Audit Reports Log</span>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Category Type</th>
                <th>Generated Date</th>
                <th>Author</th>
                <th>Format & Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((rep) => (
                <tr key={rep.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{rep.title}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', padding: '0.15rem 0.6rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', color: 'var(--accent-primary)', fontWeight: 600 }}>
                      {rep.type}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{rep.generatedDate}</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{rep.author}</td>
                  <td>
                    <span style={{ fontWeight: 700 }}>{rep.format}</span> ({rep.size})
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-primary btn-sm" onClick={() => handleDownload(rep)}>
                        <Download size={14} /> Download
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setSelectedReport(rep)}>
                        Preview
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Generate Report */}
      <Modal isOpen={isGenerateOpen} onClose={() => setIsGenerateOpen(false)} title="Configure & Generate Custom Report">
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Report Custom Title</label>
            <input type="text" className="search-input" placeholder="e.g. Q3 SOC2 Skill Audit" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Report Template Type</label>
            <select className="filter-select" style={{ width: '100%' }} value={reportType} onChange={(e) => setReportType(e.target.value as any)}>
              <option value="Skill Audit">Skill Audit Report</option>
              <option value="Risk Summary">Risk & Flight Vulnerability Summary</option>
              <option value="Training Needs">Training Needs Analysis</option>
              <option value="Executive Brief">Board Executive Brief</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Export Format</label>
            <select className="filter-select" style={{ width: '100%' }} value={format} onChange={(e) => setFormat(e.target.value as any)}>
              <option value="PDF">PDF (Formatted Executive Document)</option>
              <option value="CSV">CSV (Raw Data Spreadsheet)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsGenerateOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Generate Report Now</button>
          </div>
        </form>
      </Modal>

      {/* Modal: Preview Report */}
      <Modal isOpen={!!selectedReport} onClose={() => setSelectedReport(null)} title={`Report Preview: ${selectedReport?.title}`}>
        {selectedReport && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.2rem' }}>{selectedReport.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Generated on {selectedReport.generatedDate} by {selectedReport.author}
              </div>
            </div>

            <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Executive Summary Snapshot:</h4>
              <p>• 78.4% overall workforce technical readiness index across 5 offices.</p>
              <p>• 2 critical flight risks identified requiring immediate 1-on-1 retention interviews.</p>
              <p>• Highest capability gap: Go Microservices & LLM RAG Fine-tuning.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedReport(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => handleDownload(selectedReport)}>
                <Download size={16} /> Download {selectedReport.format}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
