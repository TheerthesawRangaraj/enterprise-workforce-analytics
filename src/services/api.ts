/**
 * SkillMatrix AI - Universal API & Data Service
 * Supports direct Backend REST API connections when VITE_API_BASE_URL is configured,
 * with zero-fail fallback to local dataset and LocalStorage for static deployments.
 */

import config from '../config/env';
import {
  mockEmployees,
  mockSkillGaps,
  mockRecommendations,
  mockAlerts,
  mockReports,
} from '../data/mockData';
import { Employee, SkillGap, Recommendation, AlertNotification, ReportItem } from '../types';

const STORAGE_KEYS = {
  EMPLOYEES: 'skillmatrix_employees_data',
  SKILL_GAPS: 'skillmatrix_gaps_data',
  RECOMMENDATIONS: 'skillmatrix_recs_data',
  ALERTS: 'skillmatrix_alerts_data',
  REPORTS: 'skillmatrix_reports_data',
};

// LocalStorage helpers
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`LocalStorage write failed for key ${key}:`, e);
  }
}

export const apiService = {
  // Health Check
  async checkHealth(): Promise<{ status: string; timestamp: string; version: string; mode: string }> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/health`);
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Backend health check unreachable, using client state:', err);
      }
    }
    return {
      status: 'healthy (client mode)',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      mode: config.env,
    };
  },

  // Employees
  async getEmployees(): Promise<Employee[]> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/employees`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error fetching employees, using local storage:', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.EMPLOYEES, mockEmployees);
  },

  async saveEmployee(employee: Employee): Promise<Employee> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/employees`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(employee),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error saving employee, saving locally:', err);
      }
    }
    const current = loadFromStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, mockEmployees);
    const updated = [employee, ...current];
    saveToStorage(STORAGE_KEYS.EMPLOYEES, updated);
    return employee;
  },

  // Skill Gaps
  async getSkillGaps(): Promise<SkillGap[]> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/skill-gaps`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error fetching skill gaps, using local storage:', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.SKILL_GAPS, mockSkillGaps);
  },

  async saveSkillGap(gap: SkillGap): Promise<SkillGap> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/skill-gaps`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gap),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error saving skill gap:', err);
      }
    }
    const current = loadFromStorage<SkillGap[]>(STORAGE_KEYS.SKILL_GAPS, mockSkillGaps);
    const updated = [gap, ...current];
    saveToStorage(STORAGE_KEYS.SKILL_GAPS, updated);
    return gap;
  },

  // Recommendations
  async getRecommendations(): Promise<Recommendation[]> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/recommendations`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error fetching recommendations:', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.RECOMMENDATIONS, mockRecommendations);
  },

  // Alerts
  async getAlerts(): Promise<AlertNotification[]> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/alerts`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error fetching alerts:', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.ALERTS, mockAlerts);
  },

  // Reports
  async getReports(): Promise<ReportItem[]> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/reports`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error fetching reports:', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.REPORTS, mockReports);
  },

  async saveReport(report: ReportItem): Promise<ReportItem> {
    if (config.apiBaseUrl) {
      try {
        const res = await fetch(`${config.apiBaseUrl}/reports`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error saving report:', err);
      }
    }
    const current = loadFromStorage<ReportItem[]>(STORAGE_KEYS.REPORTS, mockReports);
    const updated = [report, ...current];
    saveToStorage(STORAGE_KEYS.REPORTS, updated);
    return report;
  },
};

export default apiService;
