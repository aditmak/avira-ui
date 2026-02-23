// Sample patient data for Medical Co-Pilot demo
export const patients = [
  {
    id: 'P-2024-001847',
    name: 'Max Mustermann',
    firstName: 'Max',
    lastName: 'Mustermann',
    initials: 'MM',
    dateOfBirth: '1958-03-15',
    age: 67,
    gender: 'male',
    admission: '2026-01-10',
    department: 'Innere Medizin',
    ward: 'Station 3A',
    attendingPhysician: 'Dr. med. Sarah Schmidt',
    
    // Diagnoses
    diagnoses: {
      main: {
        code: 'J44.1',
        text: 'Chronische obstruktive Lungenkrankheit mit akuter Exazerbation',
        textEn: 'Chronic obstructive pulmonary disease with acute exacerbation',
      },
      secondary: [
        { code: 'J96.01', text: 'Akute respiratorische Insuffizienz', textEn: 'Acute respiratory insufficiency' },
        { code: 'I10.90', text: 'Essentielle Hypertonie', textEn: 'Essential hypertension' },
        { code: 'E11.90', text: 'Diabetes mellitus Typ 2 ohne Komplikationen', textEn: 'Type 2 diabetes mellitus without complications' },
      ],
    },
    
    // Medical history
    anamnesis: {
      de: `Der 67-jährige Patient stellte sich mit seit 3 Tagen zunehmender Dyspnoe und produktivem Husten mit gelblich-grünem Auswurf vor. Vorbekannt ist eine COPD GOLD Stadium III seit 2019. Der Patient berichtet über ca. 40 pack-years Nikotinkonsum, Nikotinkarenz seit 2020. Keine bekannten Allergien. Regelmäßige Medikamenteneinnahme: Tiotropium 18µg 1x täglich, Formoterol/Budesonid 12/400µg 2x täglich, Metformin 1000mg 2x täglich, Ramipril 5mg 1x täglich.`,
      en: `The 67-year-old male patient presented with progressive dyspnea and productive cough with yellow-green sputum for 3 days. Known history of COPD GOLD Stage III since 2019. Patient reports approximately 40 pack-years of smoking history, smoking cessation since 2020. No known allergies. Regular medications: Tiotropium 18µg once daily, Formoterol/Budesonide 12/400µg twice daily, Metformin 1000mg twice daily, Ramipril 5mg once daily.`,
    },
    
    // Vital signs at admission
    vitalSigns: {
      spO2: '88%',
      spO2Note: 'Raumluft / Room air',
      bloodPressure: '158/92 mmHg',
      heartRate: '98/min',
      respiratoryRate: '24/min',
      temperature: '37.8°C',
      timestamp: '2026-01-10T14:32:00',
    },
    
    // Lab values
    labValues: [
      { name: 'CRP', value: '85', unit: 'mg/l', reference: '<5', flag: 'high' },
      { name: 'Leukozyten', value: '14.2', unit: '×10⁹/l', reference: '4.0-10.0', flag: 'high' },
      { name: 'Hämoglobin', value: '13.8', unit: 'g/dl', reference: '13.5-17.5', flag: 'normal' },
      { name: 'Kreatinin', value: '1.1', unit: 'mg/dl', reference: '0.7-1.3', flag: 'normal' },
      { name: 'HbA1c', value: '7.2', unit: '%', reference: '<6.5', flag: 'high' },
      { name: 'proBNP', value: '320', unit: 'pg/ml', reference: '<125', flag: 'high' },
    ],
    
    // Therapy
    therapy: {
      de: `Bei Aufnahme zeigten sich eine Sauerstoffsättigung von 88% unter Raumluft sowie ein CRP von 85 mg/l. Leitliniengerecht wurde eine antibiotische Therapie mit Amoxicillin/Clavulansäure 875/125mg 3x täglich eingeleitet, ergänzt durch systemische Kortikosteroide (Prednisolon 40mg 1x täglich für 5 Tage). Unter Sauerstoffgabe (2-4l/min via Nasenbrille) und intensivierter Inhalationstherapie zeigte sich eine rasche klinische Besserung. Der CRP-Wert fiel auf 28 mg/l am Entlasstag.`,
      en: `At admission, oxygen saturation was 88% on room air and CRP was 85 mg/l. According to guidelines, antibiotic therapy with Amoxicillin/Clavulanate 875/125mg three times daily was initiated, supplemented by systemic corticosteroids (Prednisolone 40mg once daily for 5 days). With supplemental oxygen (2-4l/min via nasal cannula) and intensified inhalation therapy, rapid clinical improvement was observed. CRP decreased to 28 mg/l at discharge.`,
    },
    
    // Recommendations
    recommendations: {
      de: `Fortführung der LABA/LAMA/ICS-Kombinationstherapie gemäß GOLD-Empfehlungen. Antibiotikatherapie für weitere 3 Tage fortführen (Amoxicillin/Clavulansäure). Prednisolon-Ausschleichen: 20mg für 3 Tage, dann 10mg für 3 Tage, dann absetzen. Pneumologische Wiedervorstellung in 4 Wochen zur Kontrolle der Lungenfunktion. Bei erneuter Verschlechterung (zunehmende Dyspnoe, Fieber, verfärbtes Sputum) zeitnahe Wiedervorstellung.`,
      en: `Continue LABA/LAMA/ICS combination therapy according to GOLD guidelines. Continue antibiotic therapy for 3 more days (Amoxicillin/Clavulanate). Prednisolone tapering: 20mg for 3 days, then 10mg for 3 days, then discontinue. Pulmonology follow-up in 4 weeks for lung function assessment. In case of deterioration (increasing dyspnea, fever, discolored sputum), prompt re-presentation.`,
    },
    
    // Discharge medications
    dischargeMedications: [
      { name: 'Tiotropium', dose: '18µg', frequency: '1x täglich', route: 'inhalativ' },
      { name: 'Formoterol/Budesonid', dose: '12/400µg', frequency: '2x täglich', route: 'inhalativ' },
      { name: 'Amoxicillin/Clavulansäure', dose: '875/125mg', frequency: '3x täglich', route: 'oral', duration: '3 Tage' },
      { name: 'Prednisolon', dose: '20mg', frequency: '1x täglich', route: 'oral', duration: 'ausschleichen' },
      { name: 'Metformin', dose: '1000mg', frequency: '2x täglich', route: 'oral' },
      { name: 'Ramipril', dose: '5mg', frequency: '1x täglich', route: 'oral' },
    ],
    
    // Guideline reference
    guideline: {
      name: 'AWMF S2k-Leitlinie Diagnostik und Therapie von Patienten mit COPD',
      version: '2024',
      registryNumber: '020-006',
    },
  },
  
  {
    id: 'P-2024-002156',
    name: 'Anna Weber',
    firstName: 'Anna',
    lastName: 'Weber',
    initials: 'AW',
    dateOfBirth: '1975-08-22',
    age: 50,
    gender: 'female',
    admission: '2026-01-08',
    department: 'Chirurgie',
    ward: 'Station 5B',
    attendingPhysician: 'Prof. Dr. med. Michael Becker',
    
    // Diagnoses
    diagnoses: {
      main: {
        code: 'K35.80',
        text: 'Akute Appendizitis mit Peritonitis',
        textEn: 'Acute appendicitis with peritonitis',
      },
      secondary: [
        { code: 'K65.0', text: 'Generalisierte akute Peritonitis', textEn: 'Generalized acute peritonitis' },
        { code: 'R65.1', text: 'SIRS infektiöser Genese', textEn: 'SIRS of infectious origin' },
      ],
    },
    
    // Medical history
    anamnesis: {
      de: `Die 50-jährige Patientin wurde als Notfall mit akuten, seit 18 Stunden bestehenden rechtsseitigen Unterbauchschmerzen eingewiesen. Initial periumbilikale Schmerzen mit Wanderung in den rechten Unterbauch. Begleitsymptome: Übelkeit, Erbrechen, Appetitlosigkeit. Fieber bis 38.9°C. Keine abdominellen Voroperationen. Keine regelmäßige Medikation. Bekannte Penicillinallergie (Exanthem).`,
      en: `The 50-year-old female patient was admitted as an emergency with acute right lower abdominal pain present for 18 hours. Initial periumbilical pain with migration to right lower quadrant. Associated symptoms: nausea, vomiting, loss of appetite. Fever up to 38.9°C. No previous abdominal surgeries. No regular medications. Known penicillin allergy (rash).`,
    },
    
    // Vital signs at admission
    vitalSigns: {
      spO2: '96%',
      spO2Note: 'Raumluft / Room air',
      bloodPressure: '132/78 mmHg',
      heartRate: '110/min',
      respiratoryRate: '20/min',
      temperature: '38.9°C',
      timestamp: '2026-01-08T22:15:00',
    },
    
    // Lab values
    labValues: [
      { name: 'CRP', value: '156', unit: 'mg/l', reference: '<5', flag: 'high' },
      { name: 'Leukozyten', value: '18.7', unit: '×10⁹/l', reference: '4.0-10.0', flag: 'high' },
      { name: 'Hämoglobin', value: '12.4', unit: 'g/dl', reference: '12.0-16.0', flag: 'normal' },
      { name: 'Kreatinin', value: '0.9', unit: 'mg/dl', reference: '0.5-1.1', flag: 'normal' },
      { name: 'Laktat', value: '2.8', unit: 'mmol/l', reference: '<2.0', flag: 'high' },
      { name: 'Lipase', value: '45', unit: 'U/l', reference: '<60', flag: 'normal' },
    ],
    
    // Therapy
    therapy: {
      de: `Bei Aufnahme zeigte sich klinisch ein akutes Abdomen mit Abwehrspannung im rechten Unterbauch. Sonographisch und CT-morphologisch Nachweis einer perforierten Appendizitis mit freier abdomineller Flüssigkeit. Notfall-Laparoskopie am 08.01.2026: Appendektomie und Lavage bei gedeckt perforierter Appendizitis mit lokaler Peritonitis. Intraoperativ Umstieg auf Ciprofloxacin/Metronidazol bei bekannter Penicillinallergie. Postoperativer Verlauf komplikationslos. Kostaufbau ab Tag 2 problemlos. CRP-Regredienz auf 35 mg/l. Mobilisation selbstständig ab Tag 3.`,
      en: `At admission, clinical examination revealed acute abdomen with guarding in the right lower quadrant. Sonography and CT showed perforated appendicitis with free abdominal fluid. Emergency laparoscopy on 01/08/2026: Appendectomy and lavage for contained perforated appendicitis with local peritonitis. Intraoperative switch to Ciprofloxacin/Metronidazole due to known penicillin allergy. Postoperative course uneventful. Diet advancement from day 2 without issues. CRP regression to 35 mg/l. Independent mobilization from day 3.`,
    },
    
    // Recommendations
    recommendations: {
      de: `Antibiotikatherapie mit Ciprofloxacin 500mg 2x täglich und Metronidazol 500mg 3x täglich oral für weitere 5 Tage fortführen. Thromboseprophylaxe mit niedermolekularem Heparin für 7 Tage postoperativ. Körperliche Schonung für 2 Wochen, kein schweres Heben (>5kg) für 4 Wochen. Wundkontrolle beim Hausarzt in 7 Tagen, Fadenzug nach 10-12 Tagen. Wiedervorstellung bei Fieber, zunehmenden Bauchschmerzen, Rötung oder Sekretion der Wunden.`,
      en: `Continue antibiotic therapy with Ciprofloxacin 500mg twice daily and Metronidazole 500mg three times daily orally for 5 more days. Thromboprophylaxis with low-molecular-weight heparin for 7 days postoperatively. Physical rest for 2 weeks, no heavy lifting (>5kg) for 4 weeks. Wound check with primary care physician in 7 days, suture removal after 10-12 days. Re-presentation for fever, increasing abdominal pain, redness or discharge from wounds.`,
    },
    
    // Discharge medications
    dischargeMedications: [
      { name: 'Ciprofloxacin', dose: '500mg', frequency: '2x täglich', route: 'oral', duration: '5 Tage' },
      { name: 'Metronidazol', dose: '500mg', frequency: '3x täglich', route: 'oral', duration: '5 Tage' },
      { name: 'Enoxaparin', dose: '40mg', frequency: '1x täglich', route: 's.c.', duration: '7 Tage' },
      { name: 'Metamizol', dose: '500mg', frequency: 'bei Bedarf', route: 'oral', duration: 'max. 4x täglich' },
      { name: 'Pantoprazol', dose: '40mg', frequency: '1x täglich', route: 'oral', duration: '7 Tage' },
    ],
    
    // Guideline reference
    guideline: {
      name: 'AWMF S3-Leitlinie Diagnostik und Therapie der Appendizitis',
      version: '2023',
      registryNumber: '088-007',
    },
    
    // Operation details
    operation: {
      date: '2026-01-08',
      time: '23:45',
      procedure: 'Laparoskopische Appendektomie mit Lavage',
      procedureCode: '5-470.10',
      duration: '58 min',
      anesthesia: 'ITN',
      surgeon: 'Prof. Dr. med. M. Becker',
      assistant: 'Dr. med. L. Hoffmann',
      findings: 'Gangränöse Appendizitis mit gedeckter Perforation, lokale seropurulente Peritonitis, 150ml trübes Sekret im Douglas-Raum',
    },
  },
];

// Generated documents history
export const documentHistory = [
  {
    id: 'DOC-2026-0001',
    patientId: 'P-2024-001847',
    patientName: 'Max Mustermann',
    type: 'arztbrief',
    typeName: { de: 'Arztbrief', en: 'Discharge Letter' },
    createdAt: '2026-01-13T10:23:00',
    status: 'completed',
    user: 'Dr. med. Sarah Schmidt',
  },
  {
    id: 'DOC-2026-0002',
    patientId: 'P-2024-002156',
    patientName: 'Anna Weber',
    type: 'opBericht',
    typeName: { de: 'OP-Bericht', en: 'Surgery Report' },
    createdAt: '2026-01-12T15:45:00',
    status: 'completed',
    user: 'Prof. Dr. med. M. Becker',
  },
  {
    id: 'DOC-2026-0003',
    patientId: 'P-2024-002156',
    patientName: 'Anna Weber',
    type: 'arztbrief',
    typeName: { de: 'Arztbrief', en: 'Discharge Letter' },
    createdAt: '2026-01-12T16:30:00',
    status: 'completed',
    user: 'Dr. med. L. Hoffmann',
  },
  {
    id: 'DOC-2026-0004',
    patientId: 'P-2024-001847',
    patientName: 'Max Mustermann',
    type: 'formular',
    typeName: { de: 'Reha-Antrag', en: 'Rehab Application' },
    createdAt: '2026-01-13T11:15:00',
    status: 'pending',
    user: 'Dr. med. Sarah Schmidt',
  },
];

export default patients;
