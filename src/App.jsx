import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, Users, GitBranch, Clock, BookOpen, Settings, 
  HelpCircle, Search, Upload, FileText, Star, ChevronRight,
  Check, Edit3, Download, Send, X, ArrowLeft, Eye,
  TrendingUp, Zap, Shield, Activity, File, Folder,
  Database, Server, Cpu, Cloud, Box
} from 'lucide-react';
import { translations } from './i18n/translations';
import { patients, documentHistory } from './data/patients';

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Sidebar Component
const Sidebar = () => {
  const { lang, t } = useLanguage();
  
  return (
    <aside className="sidebar">
      <div className="logo">
        Avira
      </div>
      <div className="logo-subtitle">Medical Co-Pilot</div>
      
      <nav className="nav-section">
        <div className="nav-section-title">{lang === 'de' ? 'Hauptmenü' : 'Main Menu'}</div>
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutGrid className="nav-icon" />
          {t.nav.assistant}
        </NavLink>
        <NavLink to="/workflows" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <GitBranch className="nav-icon" />
          {t.nav.workflows}
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Clock className="nav-icon" />
          {t.nav.history}
        </NavLink>
        <NavLink to="/guidelines" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BookOpen className="nav-icon" />
          {t.nav.guidelines}
        </NavLink>
      </nav>
      

      
      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings className="nav-icon" />
          {t.nav.settings}
        </NavLink>
        <div className="nav-item">
          <HelpCircle className="nav-icon" />
          {t.nav.help}
        </div>
      </div>
    </aside>
  );
};

// Patient Selection Modal
const PatientModal = ({ isOpen, onClose, onSelect, selectedPatient }) => {
  const { lang, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;
  
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{t.dashboard.selectPatient}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        
        <div className="search-container mb-4">
          <Search className="search-icon" />
          <input
            type="text"
            className="input search-input"
            placeholder={`${t.common.search}...`}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="patient-list">
          {filteredPatients.map(patient => (
            <div
              key={patient.id}
              className={`patient-card ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
              onClick={() => { onSelect(patient); onClose(); }}
            >
              <div className="patient-avatar">{patient.initials}</div>
              <div className="patient-info">
                <div className="patient-name">{patient.name}</div>
                <div className="patient-details">
                  {patient.age} {t.patient.age}, {lang === 'de' ? (patient.gender === 'male' ? 'männlich' : 'weiblich') : patient.gender} · {patient.department}
                </div>
              </div>
              <div className="patient-id">{patient.id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Citation Modal
const CitationModal = ({ isOpen, onClose, citation }) => {
  const { lang } = useLanguage();
  
  if (!isOpen || !citation) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{lang === 'de' ? 'Datenquelle' : 'Data Source'}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-content">
          <div className="source-header mb-4">
            <span className="source-number">{citation.number}</span>
            <span className="source-type">{citation.type}</span>
          </div>
          <p className="mb-4">{citation.content}</p>
          <div className="text-small text-muted">{citation.meta}</div>
        </div>
      </div>
    </div>
  );
};

// Dashboard / Assistant Page
const DashboardPage = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [activeTab, setActiveTab] = useState('generate');
  const [discoveryTab, setDiscoveryTab] = useState('discover');
  const [draftText, setDraftText] = useState('');
  
  const handleGenerate = () => {
    if (selectedPatient) {
      navigate('/generate', { state: { patient: selectedPatient } });
    }
  };
  
  const handleFormGenerate = () => {
    if (selectedPatient) {
      navigate('/form-output', { state: { patient: selectedPatient } });
    } else {
      setPatientModalOpen(true);
    }
  };
  
  const workflowCards = [
    { key: 'arztbrief', icon: FileText, featured: true, type: 'document' },
    { key: 'opBericht', icon: FileText, type: 'document' },
    { key: 'reha', icon: File, type: 'form', featured: true },
    { key: 'uebergabe', icon: FileText, type: 'document' },
  ];
  
  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">{t.dashboard.title}</h1>
        <p className="page-subtitle">{t.dashboard.subtitle}</p>
      </div>
      
      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          <Zap size={16} />
          {t.dashboard.tabGenerate}
        </button>
        <button 
          className={`tab ${activeTab === 'draft' ? 'active' : ''}`}
          onClick={() => setActiveTab('draft')}
        >
          <Edit3 size={16} />
          {t.dashboard.tabDraft}
        </button>
      </div>
      
      {/* Generate Tab Content */}
      {activeTab === 'generate' && (
        <>
          {/* Query Section */}
          <div className="query-section">
            <div className="query-hint">
              <span>{t.dashboard.queryHint}</span>
              <span className="section-link">{t.dashboard.viewTips}</span>
            </div>
            
            <textarea
              className="query-input"
              placeholder={t.dashboard.queryPlaceholder}
              value={queryText}
              onChange={e => setQueryText(e.target.value)}
            />
            
            <div className="query-actions">
              <div className="prompt-actions">
                <button className="prompt-action">
                  <FileText size={14} />
                  {t.dashboard.loadTemplate}
                </button>
                <button className="prompt-action">
                  <Download size={14} />
                  {t.dashboard.saveTemplate}
                </button>
              </div>
              
              <button 
                className="btn btn-primary"
                onClick={handleGenerate}
                disabled={!selectedPatient}
              >
                {t.dashboard.generate}
              </button>
            </div>
          </div>
          
          {/* Upload Row */}
          <div className="upload-row">
            <div 
              className={`upload-box ${selectedPatient ? 'selected' : ''}`}
              onClick={() => setPatientModalOpen(true)}
            >
              <Users className="upload-icon" />
              <div className="upload-text">
                <div className="upload-title">
                  {selectedPatient ? selectedPatient.name : t.dashboard.selectPatient}
                </div>
                <div className="upload-subtitle">
                  {selectedPatient 
                    ? `${selectedPatient.id} · ${selectedPatient.department}`
                    : t.dashboard.selectPatientDesc
                  }
                </div>
              </div>
            </div>
            
            <div className="upload-box">
              <BookOpen className="upload-icon" />
              <div className="upload-text">
                <div className="upload-title">{t.dashboard.selectGuideline}</div>
                <div className="upload-subtitle">{t.dashboard.selectGuidelineDesc}</div>
              </div>
            </div>
          </div>
          
          {/* Discovery Tabs */}
          <div className="discovery-tabs">
            <button 
              className={`discovery-tab ${discoveryTab === 'discover' ? 'active' : ''}`}
              onClick={() => setDiscoveryTab('discover')}
            >
              {t.dashboard.discover}
            </button>
            <button 
              className={`discovery-tab ${discoveryTab === 'recent' ? 'active' : ''}`}
              onClick={() => setDiscoveryTab('recent')}
            >
              {t.dashboard.recentDocs}
            </button>
          </div>
          
          {/* Recommended Section */}
          <div className="section">
            <div className="section-header">
              <span className="section-title">{t.dashboard.recommended}</span>
              <span className="section-link">{t.dashboard.seeAll} <ChevronRight size={14} /></span>
            </div>
            
            <div className="workflow-grid">
              {workflowCards.map(card => (
                <div 
                  key={card.key}
                  className={`workflow-card ${card.featured ? 'featured' : ''}`}
                  onClick={() => {
                    if (card.type === 'form') {
                      handleFormGenerate();
                    } else if (selectedPatient) {
                      navigate('/generate', { state: { patient: selectedPatient, docType: card.key } });
                    } else {
                      setPatientModalOpen(true);
                    }
                  }}
                >
                  {card.featured && <Star className="workflow-star" size={16} fill="currentColor" />}
                  <div className="workflow-title">{t.docTypes[card.key]}</div>
                  <div className="workflow-desc">{t.docTypes[`${card.key}Desc`]}</div>
                  <div className="workflow-meta">
                    <card.icon size={14} />
                    {card.type === 'form' ? t.common.form : t.common.draft}
                    <span className="meta-dot" />
                    {card.type === 'form' ? '2' : '3'} {t.common.steps}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* For Internal Medicine */}
          <div className="section">
            <div className="section-header">
              <span className="section-title">{t.workflows.forInternal}</span>
              <span className="section-link">{t.dashboard.seeAll} <ChevronRight size={14} /></span>
            </div>
            
            <div className="workflow-grid">
              {['aufnahme', 'konsil', 'formular', 'pflege'].map(key => (
                <div key={key} className="workflow-card" onClick={() => {
                  if (key === 'formular') {
                    handleFormGenerate();
                  } else if (selectedPatient) {
                    navigate('/generate', { state: { patient: selectedPatient } });
                  } else {
                    setPatientModalOpen(true);
                  }
                }}>
                  <div className="workflow-title">{t.docTypes[key]}</div>
                  <div className="workflow-desc">{t.docTypes[`${key}Desc`]}</div>
                  <div className="workflow-meta">
                    <FileText size={14} />
                    {key === 'formular' ? t.common.form : t.common.draft}
                    <span className="meta-dot" />
                    2 {t.common.steps}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      {/* Draft Tab Content */}
      {activeTab === 'draft' && (
        <>
          <div style={{ 
            background: 'var(--color-bg)', 
            border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-lg)',
            padding: 32,
            marginBottom: 24
          }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                  {lang === 'de' ? 'Entwurfsmodus' : 'Draft Mode'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
                  {lang === 'de' 
                    ? 'Schreiben Sie Ihren Text und lassen Sie die KI bei Bedarf ergänzen oder korrigieren.'
                    : 'Write your text and let AI assist with completion or corrections as needed.'
                  }
                </div>
              </div>
              <div 
                className={`upload-box ${selectedPatient ? 'selected' : ''}`}
                onClick={() => setPatientModalOpen(true)}
                style={{ margin: 0, minWidth: 280, padding: 12 }}
              >
                <Users size={18} style={{ opacity: 0.6 }} />
                <div className="upload-text">
                  <div style={{ fontSize: 13, fontWeight: 500 }}>
                    {selectedPatient ? selectedPatient.name : t.dashboard.selectPatient}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                    {selectedPatient ? selectedPatient.id : lang === 'de' ? 'Optional' : 'Optional'}
                  </div>
                </div>
              </div>
            </div>
            
            <textarea
              style={{
                width: '100%',
                minHeight: 300,
                padding: 20,
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 14,
                fontFamily: 'inherit',
                lineHeight: 1.7,
                resize: 'vertical',
                background: '#fff'
              }}
              placeholder={lang === 'de' 
                ? 'Beginnen Sie hier mit dem Schreiben Ihres Dokuments...\n\nBeispiel:\n\nSehr geehrte Kolleginnen und Kollegen,\n\nwir berichten über die stationäre Behandlung von Herrn/Frau [Patient]...'
                : 'Start writing your document here...\n\nExample:\n\nDear Colleagues,\n\nWe report on the inpatient treatment of Mr./Ms. [Patient]...'
              }
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
            />
            
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-secondary btn-sm">
                  <Zap size={14} />
                  {lang === 'de' ? 'KI vervollständigen' : 'AI Complete'}
                </button>
                <button className="btn btn-secondary btn-sm">
                  <Edit3 size={14} />
                  {lang === 'de' ? 'Korrigieren' : 'Correct'}
                </button>
                <button className="btn btn-secondary btn-sm">
                  <BookOpen size={14} />
                  {lang === 'de' ? 'Leitlinie prüfen' : 'Check Guideline'}
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-secondary">
                  <Download size={14} />
                  {lang === 'de' ? 'Speichern' : 'Save'}
                </button>
                <button className="btn btn-primary">
                  <Send size={14} />
                  {lang === 'de' ? 'Abschließen' : 'Finalize'}
                </button>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <div className="card-title">{lang === 'de' ? 'Schnellbausteine' : 'Quick Blocks'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  lang === 'de' ? 'Anamnese einfügen' : 'Insert History',
                  lang === 'de' ? 'Diagnosen einfügen' : 'Insert Diagnoses',
                  lang === 'de' ? 'Medikation einfügen' : 'Insert Medications',
                  lang === 'de' ? 'Empfehlungen einfügen' : 'Insert Recommendations',
                ].map((block, i) => (
                  <button 
                    key={i}
                    className="btn btn-ghost btn-sm"
                    style={{ justifyContent: 'flex-start' }}
                    onClick={() => {
                      if (selectedPatient) {
                        const additions = {
                          0: lang === 'de' ? selectedPatient.anamnesis.de : selectedPatient.anamnesis.en,
                          1: `${selectedPatient.diagnoses.main.code} - ${lang === 'de' ? selectedPatient.diagnoses.main.text : selectedPatient.diagnoses.main.textEn}`,
                          2: selectedPatient.dischargeMedications.map(m => `${m.name} ${m.dose} ${m.frequency}`).join('\n'),
                          3: lang === 'de' ? selectedPatient.recommendations.de : selectedPatient.recommendations.en,
                        };
                        setDraftText(prev => prev + '\n\n' + additions[i]);
                      }
                    }}
                  >
                    <ChevronRight size={14} />
                    {block}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="card">
              <div className="card-title">{lang === 'de' ? 'Vorlagen' : 'Templates'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  lang === 'de' ? 'Arztbrief Standard' : 'Discharge Letter Standard',
                  lang === 'de' ? 'Kurzer Verlegungsbericht' : 'Brief Transfer Note',
                  lang === 'de' ? 'Konsil-Anfrage' : 'Consultation Request',
                  lang === 'de' ? 'Ambulanzbrief' : 'Outpatient Letter',
                ].map((template, i) => (
                  <button 
                    key={i}
                    className="btn btn-ghost btn-sm"
                    style={{ justifyContent: 'flex-start' }}
                  >
                    <FileText size={14} />
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      
      <PatientModal
        isOpen={patientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        onSelect={setSelectedPatient}
        selectedPatient={selectedPatient}
      />
    </main>
  );
};

// Processing Page with Animation
const ProcessingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const steps = [
    { key: 'step1', duration: 800 },
    { key: 'step2', duration: 900 },
    { key: 'step3', duration: 1000 },
    { key: 'step4', duration: 1200 },
    { key: 'step5', duration: 1100 },
  ];
  
  useEffect(() => {
    if (!patient) {
      navigate('/');
      return;
    }
    
    let stepIndex = 0;
    const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;
    
    const runStep = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        elapsed += steps[stepIndex].duration;
        setProgress((elapsed / totalDuration) * 100);
        stepIndex++;
        
        if (stepIndex < steps.length) {
          setTimeout(runStep, steps[stepIndex - 1].duration);
        } else {
          setTimeout(() => {
            navigate('/output', { state: { patient } });
          }, steps[stepIndex - 1].duration);
        }
      }
    };
    
    setTimeout(runStep, 300);
  }, [patient, navigate]);
  
  if (!patient) return null;
  
  return (
    <main className="main-content">
      <div className="processing-container">
        <div className="processing-header">
          <div className="processing-logo">A</div>
          <div className="processing-status">{t.processing.generating}</div>
        </div>
        
        <div className="processing-steps">
          {steps.map((step, index) => (
            <div 
              key={step.key}
              className={`processing-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
            >
              <div className="step-indicator">
                {index < currentStep ? (
                  <Check size={20} />
                ) : index === currentStep ? (
                  <div className="spinner" />
                ) : (
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #ddd' }} />
                )}
              </div>
              <div className="step-content">
                <div className="step-title">{t.processing[step.key]}</div>
                <div className="step-subtitle">{t.processing[`${step.key}Desc`]}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">
          {t.processing.estimatedTime}: 5 {t.processing.seconds}
        </div>
      </div>
    </main>
  );
};

// Output Page with Generated Document
const OutputPage = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || patients[0];
  
  const [citationModal, setCitationModal] = useState({ open: false, citation: null });
  
  const citations = [
    { number: 1, type: 'KIS · Diagnose', content: `Hauptdiagnose: ${patient.diagnoses.main.code} – ${lang === 'de' ? patient.diagnoses.main.text : patient.diagnoses.main.textEn}`, meta: `Erfasst: ${patient.admission}, ${patient.attendingPhysician}` },
    { number: 2, type: 'KIS · Stammdaten', content: `Geburtsdatum: ${patient.dateOfBirth} (${patient.age} Jahre), ${patient.gender === 'male' ? 'männlich' : 'weiblich'}`, meta: 'Stammdaten verifiziert' },
    { number: 3, type: 'KIS · Anamnese', content: lang === 'de' ? patient.anamnesis.de.substring(0, 150) + '...' : patient.anamnesis.en.substring(0, 150) + '...', meta: 'Aufnahme-Anamnese' },
    { number: 4, type: 'KIS · Vitalzeichen', content: `SpO2: ${patient.vitalSigns.spO2} (${patient.vitalSigns.spO2Note}), ${patient.vitalSigns.timestamp}`, meta: 'Monitoring-Daten' },
  ];
  
  return (
    <main className="main-content">
      <div className="breadcrumb">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>{t.nav.assistant}</a> / {t.docTypes.arztbrief}
      </div>
      
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 className="page-title">{lang === 'de' ? 'Arztbrief' : 'Discharge Letter'} – {patient.name}</h1>
          <span className="status-badge completed">
            <Check size={12} />
            {t.output.generated}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary">
            <Edit3 size={14} />
            {t.output.edit}
          </button>
          <button className="btn btn-secondary">
            <Download size={14} />
            {t.output.export}
          </button>
          <button className="btn btn-primary">
            <Send size={14} />
            {t.output.transferToKIS}
          </button>
        </div>
      </div>
      
      <div className="document-container">
        {/* Document */}
        <div className="document">
          <div className="doc-header">
            <div className="doc-title">{t.docContent.preliminaryLetter}</div>
            <div className="doc-subtitle">{t.docContent.hospital} · {patient.department}</div>
          </div>
          
          <div className="doc-section">
            <div className="doc-section-title">{t.docContent.diagnoses}</div>
            <div className="doc-section-content">
              <span 
                className="cited" 
                onClick={() => setCitationModal({ open: true, citation: citations[0] })}
              >
                {lang === 'de' ? patient.diagnoses.main.text : patient.diagnoses.main.textEn} ({patient.diagnoses.main.code})
                <span className="cite-number">1</span>
              </span>
              {patient.diagnoses.secondary.map((d, i) => (
                <span key={i}>, {lang === 'de' ? d.text : d.textEn} ({d.code})</span>
              ))}
            </div>
          </div>
          
          <div className="doc-section">
            <div className="doc-section-title">{t.docContent.anamnesis}</div>
            <div className="doc-section-content">
              {(lang === 'de' ? patient.anamnesis.de : patient.anamnesis.en).split('. ').map((sentence, i) => {
                if (i === 0) {
                  return (
                    <span key={i}>
                      <span 
                        className="cited"
                        onClick={() => setCitationModal({ open: true, citation: citations[1] })}
                      >
                        {sentence.split(' ').slice(0, 5).join(' ')}
                        <span className="cite-number">2</span>
                      </span>
                      {' '}{sentence.split(' ').slice(5).join(' ')}.{' '}
                    </span>
                  );
                }
                return <span key={i}>{sentence}. </span>;
              })}
            </div>
          </div>
          
          <div className="doc-section">
            <div className="doc-section-title">{t.docContent.therapy}</div>
            <div className="doc-section-content">
              <span 
                className="cited"
                onClick={() => setCitationModal({ open: true, citation: citations[3] })}
              >
                {lang === 'de' 
                  ? `Bei Aufnahme zeigten sich eine Sauerstoffsättigung von ${patient.vitalSigns.spO2} unter Raumluft`
                  : `At admission, oxygen saturation was ${patient.vitalSigns.spO2} on room air`
                }
                <span className="cite-number">4</span>
              </span>
              {' '}{lang === 'de' 
                ? patient.therapy.de.substring(patient.therapy.de.indexOf('sowie'))
                : patient.therapy.en.substring(patient.therapy.en.indexOf('and CRP'))
              }
            </div>
          </div>
          
          <div className="doc-section">
            <div className="doc-section-title">{t.docContent.recommendations}</div>
            <div className="doc-section-content">
              <span className="guideline-ref">
                {lang === 'de' ? patient.recommendations.de : patient.recommendations.en}
              </span>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="sidebar-panel">
          <div className="panel">
            <div className="panel-title">
              <FileText size={14} />
              {t.output.dataSources}
            </div>
            
            {citations.map(citation => (
              <div 
                key={citation.number}
                className="source-card"
                onClick={() => setCitationModal({ open: true, citation })}
              >
                <div className="source-header">
                  <span className="source-number">{citation.number}</span>
                  <span className="source-type">{citation.type}</span>
                </div>
                <div className="source-content">{citation.content}</div>
                <div className="source-meta">{citation.meta}</div>
              </div>
            ))}
          </div>
          
          <div className="panel">
            <div className="panel-title">
              <BookOpen size={14} />
              {t.output.guidelineMatch}
            </div>
            
            <div className="explain-item">
              <div className="explain-label">{t.output.usedGuideline}</div>
              <div className="explain-text">{patient.guideline.name} ({patient.guideline.version})</div>
            </div>
            
            <div className="explain-item">
              <div className="explain-label">{t.output.therapyCheck}</div>
              <div className="explain-text">
                {lang === 'de' 
                  ? 'Therapiewahl entspricht Leitlinienempfehlung.'
                  : 'Therapy choice corresponds to guideline recommendation.'
                }
              </div>
            </div>
          </div>
          
          <div className="panel">
            <div className="panel-title">
              <Shield size={14} />
              {t.output.qualityCheck}
            </div>
            
            <div className="quality-row">
              <span className="quality-label">{t.output.completeness}</span>
              <span className="quality-value good">98%</span>
            </div>
            <div className="quality-row">
              <span className="quality-label">{t.output.sourceCoverage}</span>
              <span className="quality-value good">100%</span>
            </div>
            <div className="quality-row">
              <span className="quality-label">{t.output.guidelineCompliance}</span>
              <span className="quality-value good">{t.output.high}</span>
            </div>
            <div className="quality-row">
              <span className="quality-label">{t.output.selfCritique}</span>
              <span className="quality-value">{t.output.passed}</span>
            </div>
          </div>
        </div>
      </div>
      
      <CitationModal
        isOpen={citationModal.open}
        onClose={() => setCitationModal({ open: false, citation: null })}
        citation={citationModal.citation}
      />
    </main>
  );
};

// Workflows Page
const WorkflowsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = ['all', 'discharge', 'admission', 'surgery', 'forms', 'communication'];
  
  const allWorkflows = [
    { key: 'arztbrief', category: 'discharge', featured: true, steps: 3, type: 'draft' },
    { key: 'formular', category: 'forms', steps: 2, type: 'form' },
    { key: 'opBericht', category: 'surgery', featured: true, steps: 3, type: 'draft' },
    { key: 'vorlaeufig', category: 'discharge', steps: 2, type: 'draft' },
    { key: 'medikation', category: 'discharge', steps: 1, type: 'output' },
    { key: 'reha', category: 'discharge', steps: 3, type: 'form' },
    { key: 'pflege', category: 'discharge', steps: 2, type: 'draft' },
    { key: 'aufnahme', category: 'admission', steps: 2, type: 'draft' },
    { key: 'konsil', category: 'communication', steps: 2, type: 'draft' },
    { key: 'uebergabe', category: 'communication', steps: 2, type: 'draft' },
  ];
  
  const filteredWorkflows = activeFilter === 'all' 
    ? allWorkflows 
    : allWorkflows.filter(w => w.category === activeFilter);
  
  return (
    <main className="main-content" style={{ background: 'var(--color-bg)' }}>
      <div className="filter-tabs">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {t.workflows[filter]}
          </button>
        ))}
      </div>
      
      <div className="section">
        <div className="section-title">{t.dashboard.recommended}</div>
        <div className="workflow-grid" style={{ marginTop: 16 }}>
          {filteredWorkflows.filter(w => w.featured).map(workflow => (
            <div 
              key={workflow.key}
              className="workflow-card featured"
              onClick={() => navigate('/')}
            >
              <Star className="workflow-star" size={16} fill="currentColor" />
              <div className="workflow-title">{t.docTypes[workflow.key]}</div>
              <div className="workflow-desc">{t.docTypes[`${workflow.key}Desc`]}</div>
              <div className="workflow-meta">
                <FileText size={14} />
                {t.common[workflow.type]}
                <span className="meta-dot" />
                {workflow.steps} {t.common.steps}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <div className="section-title">{t.workflows.forDischarge}</div>
        <div className="workflow-grid" style={{ marginTop: 16 }}>
          {filteredWorkflows.filter(w => w.category === 'discharge' && !w.featured).map(workflow => (
            <div 
              key={workflow.key}
              className="workflow-card"
              onClick={() => navigate('/')}
            >
              <div className="workflow-title">{t.docTypes[workflow.key]}</div>
              <div className="workflow-desc">{t.docTypes[`${workflow.key}Desc`]}</div>
              <div className="workflow-meta">
                <FileText size={14} />
                {t.common[workflow.type]}
                <span className="meta-dot" />
                {workflow.steps} {t.common.steps}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <div className="section-title">{t.workflows.forSurgery}</div>
        <div className="workflow-grid" style={{ marginTop: 16 }}>
          {filteredWorkflows.filter(w => w.category === 'surgery' && !w.featured).concat(
            allWorkflows.filter(w => w.category === 'admission' || w.category === 'communication')
          ).slice(0, 4).map(workflow => (
            <div 
              key={workflow.key}
              className="workflow-card"
              onClick={() => navigate('/')}
            >
              <div className="workflow-title">{t.docTypes[workflow.key]}</div>
              <div className="workflow-desc">{t.docTypes[`${workflow.key}Desc`]}</div>
              <div className="workflow-meta">
                <FileText size={14} />
                {t.common[workflow.type]}
                <span className="meta-dot" />
                {workflow.steps} {t.common.steps}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

// History Page
const HistoryPage = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">{t.history.title}</h1>
        <p className="page-subtitle">{t.history.subtitle}</p>
      </div>
      
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">247</div>
          <div className="stat-label">{t.stats.docsGenerated}</div>
          <div className="stat-change positive">
            <TrendingUp size={14} />
            +12% {lang === 'de' ? 'diese Woche' : 'this week'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">186</div>
          <div className="stat-label">{t.stats.timeSaved} ({t.stats.hours})</div>
          <div className="stat-change positive">
            <Zap size={14} />
            ~45min / {lang === 'de' ? 'Dokument' : 'document'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8.2s</div>
          <div className="stat-label">{t.stats.avgTime}</div>
          <div className="stat-change positive">
            <Activity size={14} />
            -0.5s {lang === 'de' ? 'vs. letzte Woche' : 'vs. last week'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">97%</div>
          <div className="stat-label">{t.stats.guidelineCompliance}</div>
          <div className="stat-change positive">
            <Shield size={14} />
            {lang === 'de' ? 'Ziel erreicht' : 'Target met'}
          </div>
        </div>
      </div>
      
      {/* History Table */}
      <div className="card">
        <table className="history-table">
          <thead>
            <tr>
              <th>{t.history.patient}</th>
              <th>{t.history.type}</th>
              <th>{t.history.date}</th>
              <th>{t.history.status}</th>
              <th>{t.history.actions}</th>
            </tr>
          </thead>
          <tbody>
            {documentHistory.map(doc => (
              <tr key={doc.id}>
                <td className="patient-cell">{doc.patientName}</td>
                <td className="type-cell">{doc.typeName[lang]}</td>
                <td className="date-cell">{formatDate(doc.createdAt)}</td>
                <td>
                  <span className={`status-badge ${doc.status}`}>
                    {doc.status === 'completed' ? <Check size={12} /> : <Clock size={12} />}
                    {t.history[doc.status]}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      const patient = patients.find(p => p.id === doc.patientId);
                      if (patient) navigate('/output', { state: { patient } });
                    }}
                  >
                    <Eye size={14} />
                    {t.history.view}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

// Form Output Page - Reha-Antrag
const FormOutputPage = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || patients[0];
  
  const formFields = [
    { 
      section: lang === 'de' ? 'Patientendaten' : 'Patient Data',
      fields: [
        { label: 'Name', value: patient.name, source: 'KIS · Stammdaten' },
        { label: lang === 'de' ? 'Geburtsdatum' : 'Date of Birth', value: patient.dateOfBirth, source: 'KIS · Stammdaten' },
        { label: lang === 'de' ? 'Versichertennummer' : 'Insurance Number', value: 'A123456789', source: 'KIS · Versicherung' },
        { label: lang === 'de' ? 'Krankenkasse' : 'Health Insurance', value: 'AOK Hessen', source: 'KIS · Versicherung' },
      ]
    },
    {
      section: lang === 'de' ? 'Diagnosen' : 'Diagnoses',
      fields: [
        { label: lang === 'de' ? 'Hauptdiagnose' : 'Main Diagnosis', value: `${patient.diagnoses.main.code} - ${lang === 'de' ? patient.diagnoses.main.text : patient.diagnoses.main.textEn}`, source: 'KIS · Diagnose' },
        { label: lang === 'de' ? 'Nebendiagnosen' : 'Secondary Diagnoses', value: patient.diagnoses.secondary.map(d => `${d.code} - ${lang === 'de' ? d.text : d.textEn}`).join('\n'), source: 'KIS · Diagnose' },
      ]
    },
    {
      section: lang === 'de' ? 'Rehabilitationsziel' : 'Rehabilitation Goal',
      fields: [
        { label: lang === 'de' ? 'Reha-Ziel' : 'Rehab Goal', value: lang === 'de' 
          ? 'Wiederherstellung der körperlichen Leistungsfähigkeit und Verbesserung der Atemfunktion nach akuter Exazerbation der COPD. Optimierung der Inhalationstechnik und Schulung zum Selbstmanagement.'
          : 'Restoration of physical capacity and improvement of respiratory function after acute COPD exacerbation. Optimization of inhalation technique and self-management training.',
          source: 'AI · Guideline-based' 
        },
        { label: lang === 'de' ? 'Reha-Art' : 'Rehab Type', value: lang === 'de' ? 'Pneumologische Rehabilitation' : 'Pulmonary Rehabilitation', source: 'AI · Recommendation' },
        { label: lang === 'de' ? 'Empfohlene Dauer' : 'Recommended Duration', value: lang === 'de' ? '3 Wochen stationär' : '3 weeks inpatient', source: 'AWMF Guideline' },
      ]
    },
    {
      section: lang === 'de' ? 'Medizinische Begründung' : 'Medical Justification',
      fields: [
        { label: lang === 'de' ? 'Begründung' : 'Justification', value: lang === 'de'
          ? `Der Patient wurde mit einer akuten Exazerbation der vorbekannten COPD GOLD Stadium III stationär behandelt. Bei Aufnahme bestand eine respiratorische Partialinsuffizienz (SpO2 ${patient.vitalSigns.spO2} unter Raumluft). Nach erfolgreicher Akutbehandlung ist eine Anschlussheilbehandlung medizinisch indiziert, um die erreichte Stabilisierung zu festigen, die körperliche Belastbarkeit zu verbessern und erneute Exazerbationen zu verhindern. Gemäß AWMF-Leitlinie ist bei Patienten mit COPD GOLD III-IV nach Exazerbation eine pneumologische Rehabilitation dringend empfohlen.`
          : `The patient was treated for an acute exacerbation of known COPD GOLD Stage III. At admission, respiratory partial insufficiency was present (SpO2 ${patient.vitalSigns.spO2} on room air). After successful acute treatment, follow-up rehabilitation is medically indicated to consolidate the achieved stabilization, improve physical capacity, and prevent recurrent exacerbations. According to AWMF guidelines, pulmonary rehabilitation is strongly recommended for patients with COPD GOLD III-IV after exacerbation.`,
          source: 'AI · Generated'
        },
      ]
    },
    {
      section: lang === 'de' ? 'Antragsteller' : 'Applicant',
      fields: [
        { label: lang === 'de' ? 'Behandelnder Arzt' : 'Attending Physician', value: patient.attendingPhysician, source: 'KIS · Stammdaten' },
        { label: lang === 'de' ? 'Klinik' : 'Hospital', value: lang === 'de' ? 'Universitätsklinikum Frankfurt' : 'University Hospital Frankfurt', source: 'KIS · Einrichtung' },
        { label: lang === 'de' ? 'Datum' : 'Date', value: new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US'), source: 'System' },
      ]
    },
  ];
  
  return (
    <main className="main-content">
      <div className="breadcrumb">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>{t.nav.assistant}</a> / {lang === 'de' ? 'Reha-Antrag' : 'Rehab Application'}
      </div>
      
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 className="page-title">{lang === 'de' ? 'Reha-Antrag' : 'Rehab Application'} – {patient.name}</h1>
          <span className="status-badge completed">
            <Check size={12} />
            {lang === 'de' ? 'Ausgefüllt' : 'Completed'}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary">
            <Edit3 size={14} />
            {t.output.edit}
          </button>
          <button className="btn btn-secondary">
            <Download size={14} />
            PDF
          </button>
          <button className="btn btn-primary">
            <Send size={14} />
            {lang === 'de' ? 'An Krankenkasse senden' : 'Send to Insurance'}
          </button>
        </div>
      </div>
      
      <div className="document-container">
        {/* Form */}
        <div className="document" style={{ padding: 0 }}>
          <div style={{ padding: '32px', borderBottom: '1px solid #eee', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: '#888', marginBottom: 4 }}>
                  {lang === 'de' ? 'Formular' : 'Form'}
                </div>
                <div style={{ fontSize: 20, fontWeight: 600 }}>
                  {lang === 'de' ? 'Antrag auf Anschlussheilbehandlung (AHB)' : 'Application for Follow-up Rehabilitation'}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: 12, color: '#888' }}>
                <div>{lang === 'de' ? 'Formular-Nr.' : 'Form No.'}: AHB-001</div>
                <div>{lang === 'de' ? 'Version' : 'Version'}: 2024-01</div>
              </div>
            </div>
          </div>
          
          {formFields.map((section, sIdx) => (
            <div key={sIdx} style={{ padding: '24px 32px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: '#888', marginBottom: 16 }}>
                {section.section}
              </div>
              
              <div style={{ display: 'grid', gap: 16 }}>
                {section.fields.map((field, fIdx) => (
                  <div key={fIdx} style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: 16, alignItems: 'start' }}>
                    <div style={{ fontSize: 13, color: '#666', paddingTop: 2 }}>{field.label}</div>
                    <div style={{ 
                      fontSize: 14, 
                      color: '#1a1a1a', 
                      background: '#f8f8f8', 
                      padding: '8px 12px', 
                      borderRadius: 6,
                      border: '1px solid #eee',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {field.value}
                    </div>
                    <div style={{ 
                      fontSize: 10, 
                      color: '#0d9488', 
                      background: 'rgba(13, 148, 136, 0.1)', 
                      padding: '4px 8px', 
                      borderRadius: 4,
                      whiteSpace: 'nowrap'
                    }}>
                      {field.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div style={{ padding: '24px 32px', background: '#fafafa' }}>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 200, height: 60, border: '1px dashed #ccc', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, background: '#fff' }}>
                  <span style={{ fontSize: 12, color: '#888' }}>{lang === 'de' ? 'Unterschrift Arzt' : 'Physician Signature'}</span>
                </div>
                <div style={{ fontSize: 11, color: '#888' }}>{patient.attendingPhysician}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 200, height: 60, border: '1px dashed #ccc', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, background: '#fff' }}>
                  <span style={{ fontSize: 12, color: '#888' }}>{lang === 'de' ? 'Stempel Klinik' : 'Hospital Stamp'}</span>
                </div>
                <div style={{ fontSize: 11, color: '#888' }}>{lang === 'de' ? 'Universitätsklinikum Frankfurt' : 'University Hospital Frankfurt'}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="sidebar-panel">
          <div className="panel">
            <div className="panel-title">
              <FileText size={14} />
              {lang === 'de' ? 'Automatisch befüllt' : 'Auto-filled'}
            </div>
            
            <div className="quality-row">
              <span className="quality-label">{lang === 'de' ? 'Felder gesamt' : 'Total Fields'}</span>
              <span className="quality-value">14</span>
            </div>
            <div className="quality-row">
              <span className="quality-label">{lang === 'de' ? 'Aus KIS' : 'From HIS'}</span>
              <span className="quality-value good">10</span>
            </div>
            <div className="quality-row">
              <span className="quality-label">{lang === 'de' ? 'AI-generiert' : 'AI-generated'}</span>
              <span className="quality-value">3</span>
            </div>
            <div className="quality-row">
              <span className="quality-label">{lang === 'de' ? 'System' : 'System'}</span>
              <span className="quality-value">1</span>
            </div>
          </div>
          
          <div className="panel">
            <div className="panel-title">
              <BookOpen size={14} />
              {lang === 'de' ? 'Leitlinien-Referenz' : 'Guideline Reference'}
            </div>
            
            <div className="explain-item">
              <div className="explain-label">{lang === 'de' ? 'Verwendete Leitlinie' : 'Used Guideline'}</div>
              <div className="explain-text">{patient.guideline.name} ({patient.guideline.version})</div>
            </div>
            
            <div className="explain-item">
              <div className="explain-label">{lang === 'de' ? 'Reha-Empfehlung' : 'Rehab Recommendation'}</div>
              <div className="explain-text">
                {lang === 'de' 
                  ? 'Bei COPD GOLD III-IV nach Exazerbation wird pneumologische Rehabilitation mit Evidenzgrad A empfohlen.'
                  : 'For COPD GOLD III-IV after exacerbation, pulmonary rehabilitation is recommended with evidence level A.'
                }
              </div>
            </div>
          </div>
          
          <div className="panel">
            <div className="panel-title">
              <Shield size={14} />
              {lang === 'de' ? 'Vollständigkeitsprüfung' : 'Completeness Check'}
            </div>
            
            <div className="quality-row">
              <span className="quality-label">{lang === 'de' ? 'Pflichtfelder' : 'Required Fields'}</span>
              <span className="quality-value good">100%</span>
            </div>
            <div className="quality-row">
              <span className="quality-label">{lang === 'de' ? 'Begründung' : 'Justification'}</span>
              <span className="quality-value good">{lang === 'de' ? 'Vollständig' : 'Complete'}</span>
            </div>
            <div className="quality-row">
              <span className="quality-label">{lang === 'de' ? 'ICD-Codes' : 'ICD Codes'}</span>
              <span className="quality-value good">{lang === 'de' ? 'Validiert' : 'Validated'}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// Guidelines Page
const GuidelinesPage = () => {
  const { lang } = useLanguage();
  
  const guidelines = [
    { name: 'COPD Diagnostik und Therapie', code: '020-006', version: '2024', type: 'S2k' },
    { name: 'Appendizitis Diagnostik und Therapie', code: '088-007', version: '2023', type: 'S3' },
    { name: 'Ambulant erworbene Pneumonie', code: '020-020', version: '2021', type: 'S3' },
    { name: 'Herzinsuffizienz', code: '053-014', version: '2023', type: 'NVL' },
    { name: 'Typ-2-Diabetes', code: '057-001', version: '2023', type: 'NVL' },
  ];
  
  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">{lang === 'de' ? 'Leitlinien' : 'Guidelines'}</h1>
        <p className="page-subtitle">
          {lang === 'de' 
            ? 'Verfügbare klinische Leitlinien für den Dokumentenabgleich'
            : 'Available clinical guidelines for document matching'
          }
        </p>
      </div>
      
      <div className="workflow-grid">
        {guidelines.map(gl => (
          <div key={gl.code} className="workflow-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span className="status-badge completed">{gl.type}</span>
              <span className="text-small text-muted">{gl.version}</span>
            </div>
            <div className="workflow-title">{gl.name}</div>
            <div className="workflow-meta" style={{ marginTop: 12 }}>
              <BookOpen size={14} />
              AWMF {gl.code}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};


// Settings Page
const SettingsPage = () => {
  const { lang, setLang, t } = useLanguage();
  
  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">{t.settings.title}</h1>
        <p className="page-subtitle">{t.settings.subtitle}</p>
      </div>
      
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="card-title">{t.settings.language}</div>
        <div className="language-toggle">
          <button 
            className={`language-btn ${lang === 'de' ? 'active' : ''}`}
            onClick={() => setLang('de')}
          >
            🇩🇪 {t.settings.german}
          </button>
          <button 
            className={`language-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
          >
            🇬🇧 {t.settings.english}
          </button>
        </div>
      </div>
    </main>
  );
};

// Main App Component
function App() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];
  
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/generate" element={<ProcessingPage />} />
          <Route path="/output" element={<OutputPage />} />
          <Route path="/form-output" element={<FormOutputPage />} />
        </Routes>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
