export const translations = {
  de: {
    // Navigation
    nav: {
      assistant: 'Assistent',
      patients: 'Patienten',
      workflows: 'Workflows',
      history: 'Verlauf',
      guidelines: 'Leitlinien',
      architecture: 'Architektur',
      settings: 'Einstellungen',
      help: 'Hilfe',
    },
    
    // Dashboard
    dashboard: {
      title: 'Assistent',
      subtitle: 'Klinische Dokumente intelligent generieren',
      tabGenerate: 'Generieren',
      tabDraft: 'Entwurf',
      queryHint: 'Patient auswählen und Dokument in Sekunden generieren',
      queryPlaceholder: 'Arztbrief für Patient erstellen...',
      viewTips: 'Tipps anzeigen',
      loadTemplate: 'Vorlage laden',
      saveTemplate: 'Vorlage speichern',
      generate: 'Generieren',
      selectPatient: 'Patient auswählen',
      selectPatientDesc: 'Aus KIS laden oder Fall-ID eingeben',
      selectGuideline: 'Leitlinie wählen',
      selectGuidelineDesc: 'AWMF, Klinik-intern, Fachspezifisch',
      discover: 'Entdecken',
      recentDocs: 'Letzte Dokumente',
      recommended: 'Empfohlen',
      seeAll: 'Alle anzeigen',
    },
    
    // Workflows
    workflows: {
      title: 'Workflows',
      subtitle: 'Dokumenttypen und Vorlagen',
      all: 'Alle',
      discharge: 'Entlassung',
      admission: 'Aufnahme',
      surgery: 'OP & Eingriffe',
      forms: 'Formulare',
      communication: 'Kommunikation',
      forDischarge: 'Für Entlassung',
      forSurgery: 'Für OP & Eingriffe',
      forInternal: 'Für Innere Medizin',
    },
    
    // Document Types
    docTypes: {
      arztbrief: 'Arztbrief erstellen',
      arztbriefDesc: 'Vollständigen Entlassbrief aus Patientendaten generieren',
      opBericht: 'OP-Bericht verfassen',
      opBerichtDesc: 'Strukturierten Operationsbericht aus OP-Protokoll erstellen',
      formular: 'Formular ausfüllen',
      formularDesc: 'Medizinische Formulare automatisch befüllen',
      uebergabe: 'Übergabeprotokoll',
      uebergabeDesc: 'Schichtübergabe-Dokument für Station erstellen',
      vorlaeufig: 'Vorläufiger Arztbrief',
      vorlaeufigDesc: 'Schneller Entlassbrief für zeitkritische Verlegungen',
      medikation: 'Medikationsplan exportieren',
      medikationDesc: 'Aktuellen Medikationsplan zur Entlassung aufbereiten',
      reha: 'Reha-Antrag erstellen',
      rehaDesc: 'Rehabilitationsantrag mit medizinischer Begründung',
      pflege: 'Pflegeüberleitung',
      pflegeDesc: 'Überleitungsbogen für stationäre Pflege',
      aufnahme: 'Aufnahmebefund',
      aufnahmeDesc: 'Strukturierte Erstdokumentation bei Aufnahme',
      konsil: 'Konsil-Anforderung',
      konsilDesc: 'Konsilanfrage an andere Fachabteilung',
    },
    
    // Processing
    processing: {
      generating: 'Generiere Arztbrief...',
      step1: 'Patientendaten aus KIS extrahiert',
      step1Desc: 'Diagnosen, Prozeduren, Medikation, Laborwerte',
      step2: 'Semantische Strukturierung',
      step2Desc: 'Klinischer Kontext und Verlauf analysiert',
      step3: 'Leitlinienabgleich durchgeführt',
      step3Desc: 'AWMF S3-Leitlinie, Relevante Inhalte priorisiert',
      step4: 'Arztbrief wird generiert',
      step4Desc: 'LLM-basierte Texterstellung',
      step5: 'Self-Critique & Validierung',
      step5Desc: 'Qualitätsprüfung und Erklärbarkeit',
      estimatedTime: 'Geschätzte Zeit',
      seconds: 'Sekunden',
    },
    
    // Output
    output: {
      generated: 'Generiert',
      edit: 'Bearbeiten',
      export: 'Exportieren',
      transferToKIS: 'An KIS übertragen',
      dataSources: 'Datenquellen',
      guidelineMatch: 'Leitlinienabgleich',
      qualityCheck: 'Qualitätsprüfung',
      usedGuideline: 'Verwendete Leitlinie',
      therapyCheck: 'Therapie-Prüfung',
      completeness: 'Vollständigkeit',
      sourceCoverage: 'Quellenabdeckung',
      guidelineCompliance: 'Leitlinien-Konformität',
      selfCritique: 'Self-Critique',
      passed: 'Bestanden',
      high: 'Hoch',
    },
    
    // Document Content
    docContent: {
      preliminaryLetter: 'Vorläufiger Entlassbrief',
      hospital: 'Universitätsklinikum Frankfurt',
      department: 'Innere Medizin',
      diagnoses: 'Diagnosen',
      anamnesis: 'Anamnese',
      therapy: 'Therapie und Verlauf',
      recommendations: 'Empfehlungen',
    },
    
    // History
    history: {
      title: 'Verlauf',
      subtitle: 'Generierte Dokumente',
      patient: 'Patient',
      type: 'Dokumenttyp',
      date: 'Datum',
      status: 'Status',
      actions: 'Aktionen',
      completed: 'Abgeschlossen',
      pending: 'In Bearbeitung',
      view: 'Ansehen',
    },
    
    // Architecture
    architecture: {
      title: 'Technische Architektur',
      subtitle: 'System-Dokumentation und UML-Diagramme',
      download: 'Herunterladen',
      systemOverview: 'Systemübersicht',
      dataFlow: 'Datenfluss',
      sequenceDiagram: 'Sequenzdiagramm',
      componentDiagram: 'Komponentendiagramm',
      deploymentDiagram: 'Deployment-Diagramm',
    },
    
    // Settings
    settings: {
      title: 'Einstellungen',
      subtitle: 'Anwendungskonfiguration',
      language: 'Sprache',
      german: 'Deutsch',
      english: 'English',
      appearance: 'Darstellung',
      theme: 'Farbschema',
      light: 'Hell',
      dark: 'Dunkel',
      notifications: 'Benachrichtigungen',
    },
    
    // Stats
    stats: {
      docsGenerated: 'Dokumente generiert',
      timeSaved: 'Zeit gespart',
      hours: 'Stunden',
      avgTime: 'Ø Generierungszeit',
      guidelineCompliance: 'Leitlinien-Konformität',
    },
    
    // Common
    common: {
      draft: 'Entwurf',
      form: 'Formular',
      output: 'Ausgabe',
      steps: 'Schritte',
      step: 'Schritt',
      search: 'Suchen',
      cancel: 'Abbrechen',
      save: 'Speichern',
      close: 'Schließen',
      back: 'Zurück',
      next: 'Weiter',
      loading: 'Laden...',
    },
    
    // Patient
    patient: {
      id: 'Fall-ID',
      dob: 'Geburtsdatum',
      age: 'Jahre',
      male: 'männlich',
      female: 'weiblich',
      admission: 'Aufnahme',
      department: 'Station',
    },
  },
  
  en: {
    // Navigation
    nav: {
      assistant: 'Assistant',
      patients: 'Patients',
      workflows: 'Workflows',
      history: 'History',
      guidelines: 'Guidelines',
      architecture: 'Architecture',
      settings: 'Settings',
      help: 'Help',
    },
    
    // Dashboard
    dashboard: {
      title: 'Assistant',
      subtitle: 'Generate clinical documents intelligently',
      tabGenerate: 'Generate',
      tabDraft: 'Draft',
      queryHint: 'Select patient and generate document in seconds',
      queryPlaceholder: 'Create discharge letter for patient...',
      viewTips: 'View tips',
      loadTemplate: 'Load template',
      saveTemplate: 'Save template',
      generate: 'Generate',
      selectPatient: 'Select Patient',
      selectPatientDesc: 'Load from HIS or enter case ID',
      selectGuideline: 'Select Guideline',
      selectGuidelineDesc: 'AWMF, Hospital-internal, Specialty-specific',
      discover: 'Discover',
      recentDocs: 'Recent Documents',
      recommended: 'Recommended',
      seeAll: 'See all',
    },
    
    // Workflows
    workflows: {
      title: 'Workflows',
      subtitle: 'Document types and templates',
      all: 'All',
      discharge: 'Discharge',
      admission: 'Admission',
      surgery: 'Surgery & Procedures',
      forms: 'Forms',
      communication: 'Communication',
      forDischarge: 'For Discharge',
      forSurgery: 'For Surgery & Procedures',
      forInternal: 'For Internal Medicine',
    },
    
    // Document Types
    docTypes: {
      arztbrief: 'Create Discharge Letter',
      arztbriefDesc: 'Generate complete discharge summary from patient data',
      opBericht: 'Create Surgery Report',
      opBerichtDesc: 'Generate structured surgical report from OR protocol',
      formular: 'Fill Form',
      formularDesc: 'Automatically complete medical forms',
      uebergabe: 'Handover Protocol',
      uebergabeDesc: 'Create shift handover document for ward',
      vorlaeufig: 'Preliminary Discharge Letter',
      vorlaeufigDesc: 'Quick discharge summary for time-critical transfers',
      medikation: 'Export Medication Plan',
      medikationDesc: 'Prepare current medication plan for discharge',
      reha: 'Create Rehab Application',
      rehaDesc: 'Rehabilitation application with medical justification',
      pflege: 'Nursing Transfer',
      pflegeDesc: 'Transfer form for inpatient nursing care',
      aufnahme: 'Admission Findings',
      aufnahmeDesc: 'Structured initial documentation at admission',
      konsil: 'Consultation Request',
      konsilDesc: 'Consultation request to other department',
    },
    
    // Processing
    processing: {
      generating: 'Generating Discharge Letter...',
      step1: 'Patient data extracted from HIS',
      step1Desc: 'Diagnoses, procedures, medications, lab values',
      step2: 'Semantic Structuring',
      step2Desc: 'Clinical context and course analyzed',
      step3: 'Guideline matching completed',
      step3Desc: 'AWMF S3 guideline, relevant content prioritized',
      step4: 'Discharge letter being generated',
      step4Desc: 'LLM-based text generation',
      step5: 'Self-Critique & Validation',
      step5Desc: 'Quality check and explainability',
      estimatedTime: 'Estimated time',
      seconds: 'seconds',
    },
    
    // Output
    output: {
      generated: 'Generated',
      edit: 'Edit',
      export: 'Export',
      transferToKIS: 'Transfer to HIS',
      dataSources: 'Data Sources',
      guidelineMatch: 'Guideline Matching',
      qualityCheck: 'Quality Check',
      usedGuideline: 'Used Guideline',
      therapyCheck: 'Therapy Check',
      completeness: 'Completeness',
      sourceCoverage: 'Source Coverage',
      guidelineCompliance: 'Guideline Compliance',
      selfCritique: 'Self-Critique',
      passed: 'Passed',
      high: 'High',
    },
    
    // Document Content
    docContent: {
      preliminaryLetter: 'Preliminary Discharge Letter',
      hospital: 'University Hospital Frankfurt',
      department: 'Internal Medicine',
      diagnoses: 'Diagnoses',
      anamnesis: 'History',
      therapy: 'Therapy and Course',
      recommendations: 'Recommendations',
    },
    
    // History
    history: {
      title: 'History',
      subtitle: 'Generated Documents',
      patient: 'Patient',
      type: 'Document Type',
      date: 'Date',
      status: 'Status',
      actions: 'Actions',
      completed: 'Completed',
      pending: 'Pending',
      view: 'View',
    },
    
    // Architecture
    architecture: {
      title: 'Technical Architecture',
      subtitle: 'System documentation and UML diagrams',
      download: 'Download',
      systemOverview: 'System Overview',
      dataFlow: 'Data Flow',
      sequenceDiagram: 'Sequence Diagram',
      componentDiagram: 'Component Diagram',
      deploymentDiagram: 'Deployment Diagram',
    },
    
    // Settings
    settings: {
      title: 'Settings',
      subtitle: 'Application configuration',
      language: 'Language',
      german: 'Deutsch',
      english: 'English',
      appearance: 'Appearance',
      theme: 'Color Theme',
      light: 'Light',
      dark: 'Dark',
      notifications: 'Notifications',
    },
    
    // Stats
    stats: {
      docsGenerated: 'Documents generated',
      timeSaved: 'Time saved',
      hours: 'hours',
      avgTime: 'Avg. generation time',
      guidelineCompliance: 'Guideline compliance',
    },
    
    // Common
    common: {
      draft: 'Draft',
      form: 'Form',
      output: 'Output',
      steps: 'steps',
      step: 'step',
      search: 'Search',
      cancel: 'Cancel',
      save: 'Save',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      loading: 'Loading...',
    },
    
    // Patient
    patient: {
      id: 'Case ID',
      dob: 'Date of Birth',
      age: 'years',
      male: 'male',
      female: 'female',
      admission: 'Admission',
      department: 'Ward',
    },
  },
};

export const useTranslation = (lang) => {
  return translations[lang] || translations.de;
};
