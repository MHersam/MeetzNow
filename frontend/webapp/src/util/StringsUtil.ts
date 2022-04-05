/**
 * export all strings that the app need in german language
 */
import {breakStatement} from "babel-types";

export const StringsUtil = {

    /**
     * participate poll
     */
    bestTimeSlotText: "Bester Zeitslot: ",
    withTimeSlot: "mit",
    participantsTimeSlots: "der Teilnehmer.",

    /**
     * ColorVisualisationPollParticipate
     */
    firstStep : '0%',
    secondStep :  '1% bis unter 25%',
    thirdStep :  '25% bis unter 50%',
    fourthStep :  '50% bis unter 65%',
    fifthStep :  '65% bis unter 80%',
    sixthStep :  '80% bis unter 95%',
    seventhStep :  '95% bis unter 100%',
    eightStep :  '100%',
    colorVisualisationOver: 'Über',
    colorVisualisationParticipants: 'aller Teilnehmer.',

    /**
     * PollList
     */
    searchFirst :  'Deine Suche nach',
    searchSecound :  'hatte keine Resultate',
    creator :  'Du',
    pollListSearch: 'Suche',

    /**
     * PollListData
     */
    createdByYou :  'Von dir Erstellt',
    createdByOther :  'Teilgenommen',
    createdTotal : 'Gesamtübersicht',

    /**
     * Comments
     */
    commentStateDefault : 'default',
    commentStateEditing : 'editing',
    labelCommentUpdate : 'Kommentar Update',
    labelComments : 'Kommentare',
    placeholderComment : 'Kommentar Hinzufügen',

    /**
     * Button text
     */
    buttonSave : 'Speichern',
    buttonAbort : 'Abbrechen',
    buttonDelete : 'Löschen',
    buttonEditing : 'Bearbeiten',
    buttonSend : 'Absenden',
    buttonPollParticipate : 'Umfrage Teilnehmen',
    buttonInputReset : 'Eingabe Zurücksetzen',

    /**
     * PollInformation
     */
    date : 'Datum: ',
    event : 'Ereignis: ',
    time : 'Uhrzeit: ',
    place : 'Ort: ',
    participants : 'Teilnehmer: ',
    creatorPoll : 'Ersteller: ',
    myListings : 'Meine Einträge: ',

    /**
     * LabelPollList
     */
    labelTotal : 'Gesamtübersicht',
    labelCreatedByMe : 'Von dir Erstellt',
    labelCreatedByOthers : 'Teilgenommen',

    /**
     * PollParticipatePopUp
     */
    popUpText : 'Ziehe mit der Maus über die Zeitslots, die zur Verfügung stehen',
    popLabelName : 'Name',
    popUpLabel: 'Optional: Berechne die Reisezeit von deiner Eingabe zum Umfrageort',
    popUpLabelHome: 'Startort',
    popUpLabelDestination: 'Zielort',
    popUpArrivingTime: 'Anfahrtszeit: ',
    popUpRule: 'Feld darf nicht leer sein!',
    popUpConfirmation: 'Erfolgreich Teilgenommen.',
    popUpTimeSlotMinDuration: 'Ein Zeitslot sollte die mindest Meetinglänge haben von: ',
    popUpCalculate: 'Berechne',
    popUpStartError: 'Die Abstimmzeit der Umfrage hat noch nicht begonnen!',
    popUpEndError: 'Die Abstimmzeit der Umfrage ist bereits vorbei!',
    popTipAddress: 'Berechne die Ankunftszeit indem du die Adresse eintippst und auf berechnen klickst. Deine Adresse sollte im Format Straße Hausnummer, Stadt sein',
    popUpMinute: 'Minute',
    popUpMinutes: 'Minuten',
    popUpHour: 'Stunde',
    popUpHours: 'Stunden',
    popUpCalendarText: 'Lade deinen Kalender hoch, um freie Zeitslots einzutragen, die die Mindestzeit haben.',

    /**
     * PollListComponent
     */
    continuedPolls : 'Laufende Umfragen',
    pastPolls : 'Vergangene Umfragen',

    /**
     * Colors
     */
    colorPrimary : 'primary',
    colorGrey : 'grey',

    /**
     * footer PollParticipate
     */
    repeatPoll : 'Umfrage Wiederholen',
    editPoll : 'Umfrage Bearbeiten',
    deletePoll : 'Umfrage Löschen',
    backToOverview : 'Zurück zur Übersicht',
    copyright : '2018 —',
    meetznow : 'Meetznow.io',
    sharePoll : 'Umfrage teilen',
    deletePollHeader : 'Umfrage Löschen',
    deletePollConfirm : 'Möchten Sie die Umfrage löschen?',
    deletePollDelete : 'Umfrage Löschen',

    /**
     * Footer Login SignUp
     */
    footerDate : 'Gebe das Datum an, an dem das Treffen stattfinden soll. Du kannst natürlich auch mehrere Tage zur Auswahl stellen',
    footerTimeSlots : 'Bestimme die Zeitslots, welche den Teilnehmern zur Verfügung stehen sollen.',
    footerPlace : 'Lege den Treffpunkt für euer Meeting fest. Dabei können die Teilnehmer auch ihre Wegdauer miteinplanen.',
    footerParticipants : 'Lade alle Personen ein, die am Treffen teilnehmen sollen - mit Meetznow könnt ihr euch ganz felxibel auf das perfekte Datum einigen!',

    /**
     * login and Sign Up
     */
    loginEmail : 'E-mail',
    loginPassword : 'Passwort',
    signUpPasswordConfirm : 'Passwort bestätigen',
    loginButton : 'Einloggen',
    loginBackButton : 'Zurück',
    loginRegistry : 'Kostenlos Registrieren',
    loginWithEmail : 'Mit E-Mail einloggen',
    loginFacebook : 'Mit Facebook einloggen',
    loginTwitter : 'Mit Twitter einloggen',
    loginGoogle : 'Mit Google einloggen',
    loginMeetz : 'Meetz Now',
    loginHeader : 'Join us to plan the perfect meeting',
    loginText : 'Login',
    loginEmailAdress : 'E-Mail Adresse',
    loginForgotPassword : 'Passwort vergessen?',
    signUpText :  'Jetzt kostenlos Registrieren',
    signUpAdditionalText : 'Ergänze deine Profildaten',
    signUpRegistryButton : 'Jetzt Registrieren',
    signUpAccount : 'Du hast bereits ein Benutzerkonto? ',
    signUpLogin : ' Jetzt Einloggen',
    signUpGeneral : 'Allgemeine Daten',
    signUpAdditional : 'Weitere Daten',
    signUpConfirmation : 'Bestätigung',
    signUpButtonSkip : 'Überspringen',
    signUpSkipText : 'Du kannst die Daten jederzeit in deinem Profil vervollständigen.',
    signUpCreate : 'Angaben speichern',
    signUpName : 'Vorname',
    signUpSurname : 'Nachname',
    signUpUsername : 'Username',
    signUpCompany : 'Unternehmen',
    signUpProfilPicture : 'Profilbild',
    signUpBackgroundPicture : 'Hintergrundbild',
    signUpChangeProfilPic : 'Profilbild ändern',
    signUpChangeBackgroundPic : 'Hintergrundbild ändern',
    signUpSuccessful : 'Du hast dich erfolgreich registriert!',
    signUpGetStarted : 'Jetzt loslegen',
    signUpButtonGoBack : 'Zurück',
    passwordForgot : 'Passwort vergessen?',
    passwordForgotText : 'Geb deine E-Mail-Adresse an, um dein Passwort zurückzusetzen!',
    passwordForgotSend : 'Absenden',
    passwordForgotSendNewPassword : 'Wir haben dir eine Mail zum Zurücksetzen deines Passwortes gesendet!',
    passwordForgotBackToHome : 'Zurück zur Startseite',
    signUpConfirmationEmail : 'Email Adresse: ',
    signUpConfirmationUserName : 'Username: ',
    signUpConfirmationPassword : 'Passwort: ',
    signUpConfirmationCompany : 'Unternehmen: ',
    signUpConfirmationCountry : 'Land: ',
    signUpConfirmationName: 'Vorname: ',
    signUpConfirmationSurname: 'Nachname: ',
    signUpGermany: 'Deutschland',
    signUpEngland: 'England',
    signUpFrance: 'Frankreich',
    signUpSpain: 'Spanien',

    /**
     * create a poll
     */
    createGeneral : 'Allgemeine Daten',
    createAddDates : 'Füge die Daten hinzu',
    createConfirm : 'Bestätige die Eingabe',
    createBegin : 'Beginn',
    createEnd : 'Ende',
    createTimeSteps : 'Zeitschritte',
    createMeetingLenght : 'Termin Dauer',
    createPlace : 'Ort',
    createTitle : 'Thema',
    createPicture : 'Bild',
    createPictureDrop : 'Datei hier ablegen',
    creationDropError: 'Die Datei ist entweder größer als 0.5MB oder es wurden mehr als eine Datei hochgeladen, dass nicht erlaubt ist',
    createAddParticipants : 'Teilnehmer hinzufügen',
    createEmail : 'E-Mail Adresse',
    createTheme : 'Theme',
    createPollStart : 'Start Abstimmdatum',
    createPollEnd : 'Ende Abstimmdatum',
    createColorHeader: 'Header Farbe',
    createColorContent : 'Inhaltliche Farbe',
    createColorButton : 'Button Farbe',
    createColorText : 'Text Farbe',
    createBackgroundImage : 'Logo auswählen',
    createButtonForward : 'Weiter',
    createButtonReset : 'Zurück',
    createCalendar: 'Wähle Tage aus und lade danach einen Kalender hoch um in den ausgewählten Tagen die belegten Termine zu blockieren: ',
    creationConfirmPlace : 'Ort: ',
    creationConfirmTimeSlotBegin : 'Zeitslotbeginn: ',
    creationConfirmTimeSlotEnd : 'Zeitslotende: ',
    creationConfirmTimeSteps : 'Zeitschritte: ',
    creationConfirmTitle: 'Thema: ',
    creationConfirmTheme: 'Theme: ',
    creationConfirmStartDate : 'Start Abstimmdatum: ',
    creationConfirmEndDate : 'Ende Abstimmdatum: ',
    creationConfirmMeetingLength : 'Termin Dauer: ',
    creationConfirmPassword : 'Passwort',
    creationConfirmPasswordPlacehoder : 'Passwort festlegen?',
    creationConfirmParticipant : 'Teilnehmer ',
    creationConfirmCheckbox: 'Sollen die Abstimmresultate andere Teilnehmer für alle Teilnehmner einsehbar sein?',
    creationStandardTimeSlotBegin : '0:00',
    creationStandardTimeSlotEnd : '23:59',
    creationStandardTimeSteps : '0:30',
    creationStandardMeetingLength : '1:00',
    creationStandardTitle : 'Kein Thema festgelegt',
    creationStandardPlace : 'Kein Ort festgelegt',
    creationCreate : 'Erstellen',
    creationConfirm : 'Umfrage Erfolgreich erstellt!',
    creationConfirmShare : 'Umfrage teilen',
    creationConfirmToView : 'zur Übersicht',
    creationConfirmationLink: 'Link kopiert',
    creationErrorMessage : 'Fülle alle Felder korrekt aus',
    creationErrorUsername: 'Fülle den Usernamen aus',
    creationErrorMessageTimeSlots: 'Wähle Zeitlots',
    creationEmailError : 'E-mail muss valide sein',
    creationDateEndError : 'Abstimmende darf nicht vor dem Anfang sein',
    creationDateStartError : 'Abstimmanfang darf nicht nach heute sein',
    creationTimeEndError : 'Endzeit darf nicht vor der Anfangszeit sein',
    creationRightClick: 'Mit Rechtsklick eigene Termin Dauer setzen',
    emailList : 'Email Liste: ',
    creationSetTime : 'Setze die Meeting Länge',
    creationConfirmPasswordSec : 'Bestätige das Passwort',
    uploadFile: 'Datei auswählen',
    creationMapConfirm: 'Ort Übernehmen',
    creationMapInvalid: 'Ort ist invalide',
    creationErrorDate: 'Der ausgewählte Tag sollte nach oder gleich dem Umfrage Start sein.',

    /**
     * themes
     */
    themeLight : 'Light',
    themeDark : 'Dark',

    /**
     * Account
     */
    accountGermany: 'Deutschland',
    accountEngland: 'England',
    accountFrance: 'Frankreich',
    accountSpain: 'Spanien',
    accountCountry: 'Land',
    accountName: 'Vorname',
    accountSurname: 'Nachname',
    accountUsername: 'Benutzername',
    accountCompany: 'Unternehmen',
    accountOldPassword: 'Altes Password',
    accountNewPassword: 'Neues Password',
    accountEmail: 'E-Mail Adresse',
    accountEditing: 'Account bearbeiten',
    accountAbort: 'Abbrechen',
    accountSave: 'Änderung Speichern',
    accountTheme: 'Theme',
    accountDelete: 'Account löschen',
    accountDeleteSure: 'Möchten Sie ihr Account wirklich löschen?',


    /**
     * Home
     */
    homePollNew: 'Neue Umfrage Erstellen',
    homePollOverview: 'Umfrageübersicht',
    homePollAccount: 'Mein Account',

    /**
     * social sharing
     */
    socialTitle: 'Meetznow',
    socialDescription: 'Hier kannst du an der Umfrage Teilnehmen',
    socialHashtags: 'Meetz,Meetznow',

    /**
     * MapsPlaces
     */
    mapsBerlin: 'Berlin',
    mapsMunich: 'München',
    mapsHamburg: 'Hamburg',
    mapsFrankfurt: 'Frankfurt am Main',
    mapsStuttgart: 'Stuttgart',
    mapsCologne: 'Köln',
    mapsSearch: 'Ort suchen',

    /**
     * MeetingLenghtPopUp
     */
    meetingSetTime: 'Setze die Zeit',
    meetingSetButton: 'Setzen',

    /**
     * navigationDrawer
     */
    navigationDrawerEdit: 'EDIT',

    /**
     * ToolBar
     */
    toolBarLogin: 'Anmelden',
    toolBarRegistry: 'Registrieren',
    toolBarSignedInAs: 'Angemeldet als: ',
    toolBarLogOut: 'Abmelden',
    toolbarSelectLanguage: 'Sprache wählen',
    toolbarLanguageGerman: 'Deutsch',
    toolbarLanguageEnglish:'Englisch',
    toolbarDialogClose: 'schließen',
    toolbarDarkThemeSelector: 'Dark Theme',
    toolbarDataProtection: 'Datenschutz',
    toolbarLegalNotice: 'Impressum',
    toolbarTermsOfUse: 'Nutzungsbedingungen',

    /**
     * Account
     */
    accountOwner: 'Mein Account',
    accountLanguage: 'Sprache',
    accountGerman: 'German',
    accountEnglish: 'English',

    /**
     * rules
     */
    ruleFieldNotEmpty: 'Felder dürfen nicht leer sein',
    rulePasswordMinLength: 'Passwörter müssen mindestens 6 Zeichen lang sein',
    rulePasswordWrong: 'Falsches Passwort',
    rulePasswordSimilar: 'Passwörter müssen übereinstimmen',

    /**
     * PollListData
     */
    pollListDataEvent: 'Ereignis',
    pollListDataID: 'ID',
    pollListDataPollStart: 'Umfrage Start',
    pollListDataPollEnd: 'Umfrage Ende',
    pollListDataLocation: 'Ort',
    pollListDataPollVoteEnd: 'Abstimmende',
    pollListDataParticipants: 'Teilnehmer',
    pollListDataCreator: 'Ersteller',

    loading : 'Loading ...',

    dataProtection : 'Um unsere Webseite für Sie optimal zu gestalten und fortlaufend verbessern zu können, ' +
                'verwenden wir Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.',
    closeSnackbar: 'Schließen',

    goto: 'Gehe zu: ',

    /**
     * HelpPage
     */
    helpTitle: 'Hilfe / FAQ',
    helpContact: 'Kontakt',
    helpContactPerson: 'Institut für Steuerungstechnik der Werkzeugmaschinen und Fertigungseinrichtungen',
    iswAdress: 'Seidenstr. 36, ' + '70174 Stuttgart',

    question1:'Kann ich an einer Umfrage teilnehmen, auch wenn ich keinen Account besitze?',
    question2:'Wie kann ich an einer Umfrage teilnehmen?',
    question3:'Wie kann ich eine Umfrage wiederholen / löschen?',
    question4:'Wie kann ich das Outlook Plug-In verwenden?',
    question5:'Wie kann ich das Theme ändern?',
    question6:'Wie kann ich meinen Account löschen?',
    question7:'An wen kann ich mich wenden, wenn ich Probleme mit der Anwendung habe?',

    answer1:"Ja, du kannst über einen Link auf die jeweilige Umfrage zugreifen, auch wenn du keinen Account besitzt.",
    answer2:'Öffne auf der "Umfrage Liste"-Seite die Umfrage, an der du teilnehmen möchtest. Den Teilnehmen-Button findest du neben der Umfragentabelle.',
    answer3:'Öffne auf der "Umfrage Liste"-Seite die Umfrage, die du wiederholen / löschen möchtest. Den Wiederholen-/Löschen-Button findest du am Ende der Seite.',
    answer4:'TODO',
    answer5:'Auf der "Mein Account"-Seite kannst du einen dunklen oder hellen Theme und die englische oder deutsche Sprachversion auswählen.',
    answer6:'Wenn du deinen Account löschen möchtest, kontaktiere uns über die unten ausgeführten Kontaktdaten.',
    answer7:'Bei Problemen kannst du dich an den unten ausgeführten Kontakt wenden.',


    /**
     * ISW
     */
    iswName: 'Institut für Steuerungstechnik der Werkzeugmaschinen und Fertigungseinrichtungen',
    iswStreet: 'Seidenstr. 36,',
    iswCity: 'D-70174 Stuttgart',
    iswCountry: 'Germany',
    iswTel: '+49 (0) 711 - 685 82410',
    iswFax: '+49 (0) 711 - 685 82808',
    iswMail: 'info@isw.uni-stuttgart.de',
    iswPage: 'https://www.isw.uni-stuttgart.de/',


    /**
     * data protection
     */
    dpTitle: 'Datenschutzerklärung und Hinweise zur Datenverarbeitung',
    dpSecondTitle: 'Kontaktdaten verantwortliche Stelle und Datenschutzbeauftragter',
    dpResponsibleBody: 'Verantwortliche Stelle:',
    dpDataProtectionOfficer : 'Datenschutzbeauftragter:',
    dpDPOTextPart1: 'Der Datenschutzbeauftragte ist unter der o.g. Anschrift beziehungsweise unter ',
    dpDPOMail: 'datenschutz@uni-stuttgart.de',
    dpDPOTextPart2: ' erreichbar.',
    dp1Title: '1. Datenschutz',
    dp1Text: 'Wir freuen uns über Ihren Besuch auf unseren Webseiten und Ihr Interesse an unseren Angeboten. Der Schutz Ihrer personenbezogenen Daten ist für uns ein wichtiges Anliegen. In diesen Datenschutzhinweisen erklären wir, wie wir Ihre personenbezogenen Daten erheben, was wir damit tun, für welche Zwecke und auf welchen Rechtsgrundlagen dies geschieht, und welche Rechte und Ansprüche sich damit für Sie verbinden.\n'
                + 'Unsere Datenschutzhinweise für den Gebrauch unserer Webseiten gelten nicht für Ihre Aktivitäten auf den Webseiten von sozialen Netzwerken oder anderen Anbietern, die Sie über die Links auf unseren Webseiten erreichen können. Bitte informieren Sie sich auf den Webseiten dieser Anbieter über deren Datenschutzbestimmungen.',
    dp2Title: '2. Zwecke der Verarbeitung',
    dp2Text: 'Die bei einem Besuch unserer Webseiten erhobenen personenbezogenen Daten verwenden wir, um diese für Sie möglichst komfortabel zu betreiben sowie unsere IT-Systeme vor Angriffen und anderen rechtswidrigen Handlungen zu schützen.',
    dp2_1Title: '2.1 Einwilligung (Art. 6 Abs. 1a DS-GVO)',
    dp2_1Text: 'Eine Verarbeitung von personenbezogenen Daten für bestimmte Zwecke (z. B. Kundenverwaltung, Weitergabe an andere Dritte, Auswertung von Daten für Marketingzwecke usw.) findet statt, wenn Sie uns eine Einwilligung erteilt haben.',
    dp2_2Title: '2.2 Vertragliche oder vorvertragliche Pflichten (Art. 6 Abs. 1b DS-GVO)',
    dp2_2Text: 'Wir verarbeiten personenbezogene Daten, deren Angabe erforderlich ist für die Erfüllung eines Vertrags, dessen Vertragspartei Sie sind, oder zur Durchführung vorvertraglicher Maßnahmen, die auf Ihre Anfrage erfolgen. Die Zwecke der Datenverarbeitung richtet sich nach dem konkreten Vertrag und können unter anderem Auswertungen, Beratung sowie die Durchführung von weiteren Aktionen umfassen. Personenbezogene Daten von Beschäftigten verarbeiten wir für Zwecke des Beschäftigungsverhältnisses, wenn dies für die Entscheidung über die Begründung eines Beschäftigungsverhältnisses oder nach Begründung des Beschäftigungsverhältnisses für dessen Durchführung oder Beendigung oder zur Ausübung oder Erfüllung der sich aus einem Gesetz ergebenden Rechte und Pflichten erforderlich ist.',
    dp2_3Title: '2.3 Gesetzliche Vorgaben (Art. 6 Abs. 1c DS-GVO)',
    dp2_3Text: 'Aufgrund rechtlicher Verpflichtung erfolgt eine Datenverarbeitung z.B. für Zwecke der Betrugs- und Geldwäscheprävention, Erfüllung steuerrechtlicher Kontroll- und Meldepflichten und der Auskunft an Behörden.',
    dp2_4Title: '2.4 Interessenabwägung (Art. 6 Abs. 1f DS-GVO)',
    dp2_4Text: 'Zur Wahrung berechtigter Interessen von uns oder Dritten erfolgt darüber hinaus eine Datenverarbeitung für bestimmte Zwecke nach vorheriger Interessenabwägung, z.B. zur Sicherstellung des Hausrechts, Wahrung rechtlicher Ansprüche, Aufklärung von Straftaten, Ermittlung von Ausfallrisiken, optimierten Produktentwicklung, optimierten Kundenansprache zu Werbezwecken, optimierten Bedarfsplanung oder zur Sicherstellung der Datensicherheit.',
    dp3Title: '3. Weitergehende Datenverarbeitung im Rahmen der Webseiten-Nutzung',
    dp3_1Title: '3.1 Pseudonymisierte Nutzung der Internetseite',
    dp3_1Text: 'Sie können unsere Internetseiten grundsätzlich besuchen, ohne uns personenbezogene Daten mitzuteilen. Pseudonymisierte Nutzungsdaten werden nicht mit den Daten des Trägers des Pseudonyms zusammengeführt. Eine Erstellung von pseudonymen Nutzungsprofilen findet nicht statt.',
    dp3_2Title: '3.2 Statistische Auswertung der Besuche dieser Internetseite',
    dp3_2Text: 'Wir erheben, verarbeiten und speichern bei dem Aufruf dieser Internetseite oder einzelner Dateien der Internetseite folgende Daten: IP-Adresse, Webseite, von der aus die Datei abgerufen wurde, Name der Datei, Datum und Uhrzeit des Abrufs, übertragene Datenmenge und Meldung über den Erfolg des Abrufs (sog. Web-Log). Diese Zugriffsdaten verwenden wir ausschließlich in nicht personalisierter Form für die stetige Verbesserung unseres Internetangebots und zu statistischen Zwecken.',
    dp3_3Title: '3.3 Plugins / Verarbeitung von Daten außerhalb der EU',
    dp3_3Text: 'Auf unserer Internetseite verwenden wir aktive Java-Script Inhalte von externen Anbietern. Durch Aufruf unserer Internetseite erhalten diese externen Anbieter ggf. personenbezogene Informationen über Ihren Besuch auf unserer Internetseite. Sie können dies verhindern, indem Sie einen Java-Script-Blocker oder Java-Script in Ihrem Browser deaktivieren. Hierdurch kann es zu Funktionseinschränkungen auf Internetseiten kommen, die Sie besuchen.',
    dp4Title: '4. Übertragung personenbezogener Daten an Dritte; Social Plug-ins',
    dp4Text: 'Unsere Webseiten können auch Angebote Dritter enthalten. Wenn Sie ein solches Angebote anklicken, übertragen wir im erforderlichen Umfang Daten an den jeweiligen Anbieter (z. B. die Angabe, dass Sie dieses Angebot bei uns gefunden haben).\n'
                + 'Wenn wir auf unseren Webseiten sogenannte „Social Plug-ins“ sozialer Netzwerke wie Twitter, Facebook, Google und Microsoft Outlook einsetzen, binden wir diese wie folgt ein:\n'
                + 'Wenn Sie unsere Webseiten besuchen, sind die Social Plug-ins deaktiviert, d.h. es findet keine Übertragung irgendwelcher Daten an die Betreiber dieser Netzwerke statt. Falls Sie eines der Netzwerke nutzen möchten, klicken Sie auf das jeweilige Social Plug-in, um eine direkte Verbindung mit dem Server des jeweiligen Netzwerks aufzubauen.\n'
                + 'Falls Sie bei dem Netzwerk ein Nutzerkonto haben und im Moment des Aktivierens des Social Plug-ins dort eingeloggt sind, kann das Netzwerk Ihren Besuch der unserer Webseiten Ihrem Nutzerkonto zuordnen. Wenn Sie das vermeiden möchten, loggen Sie sich bitte vor der Aktivierung des Social Plug-ins aus dem Netzwerk aus.\n'
                + 'Wenn Sie ein Social Plug-in aktivieren, überträgt das Netzwerk die dadurch verfügbar werdenden Inhalte direkt an Ihren Browser, der sie in unsere Webseiten einbindet. In dieser Situation können auch Datenübertragungen stattfinden, die vom jeweiligen sozialen Netzwerk initiiert und gesteuert werden. Für Ihre Verbindung zu einem sozialen Netzwerk, die zwischen dem Netzwerk und Ihrem System stattfindenden Datenübertragungen und für Ihre Interaktionen auf dieser Plattform gelten ausschließlich die Datenschutzbestimmungen des jeweiligen Netzwerks.\n'
                + 'Das Social Plug-in bleibt aktiv, bis Sie es deaktivieren oder Ihre Cookies löschen.\n'
                + 'Wenn Sie den Link zu einem Angebot anklicken oder ein Social Plug-in aktivieren, kann es sein, dass personenbezogene Daten zu Anbietern in Ländern außerhalb des Europäischen Wirtschaftsraums gelangen, die aus der Sicht der Europäischen Union („EU“) kein den EU-Standards entsprechendes „angemessenes Schutzniveau“ für die Verarbeitung personenbezogener Daten gewährleisten. Bitte denken Sie an diesen Umstand, bevor Sie einen Link anklicken oder ein Social Plug-in aktivieren und damit eine Übertragung Ihrer Daten auslösen.',
    dp5Title: '5. Unterrichtung über die Nutzung von Cookies',
    dp5Text: 'Auf verschiedenen Seiten verwenden wir Cookies, um den Besuch unserer Webseite attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen. Bei den sog. \'Cookies\' handelt es sich um kleine Textdateien, die Ihr Browser auf Ihrem Rechner ablegen kann. Der Vorgang des Ablegens einer Cookie-Datei wird auch \'ein Cookie setzen\' genannt. Sie können Ihren Browser selbst nach Ihren Wünschen so einstellen, dass Sie über das Setzen von Cookies informiert werden, von Fall zu Fall über die Annahme entscheiden oder die Annahme von Cookies grundsätzlich akzeptieren oder grundsätzlich ausschließen. Wie das im Einzelnen funktioniert, entnehmen Sie bitte der Anleitung Ihres Browsers bzw. Endgeräte Herstellers. Cookies können zu unterschiedlichen Zwecken eingesetzt werden, z.B. um zu erkennen, dass Ihr PC schon einmal eine Verbindung zu einem Webangebot hatte (dauerhafte Cookies) oder um zuletzt angesehene Angebote zu speichern (Sitzungs-Cookies). Wir setzen Cookies ein, um Ihnen einen gesteigerten Benutzerkomfort zu bieten. Die meisten der von uns verwendeten Cookies werden nach Ende der Browser-Sitzung wieder von Ihrer Festplatte gelöscht (Sitzungs-Cookies). Andere Cookies verbleiben auf Ihrem Rechner und ermöglichen es uns, Ihren Rechner bei Ihrem nächsten Besuch wieder zu erkennen (dauerhafte Cookies). Durch die Art und Weise wie wir Cookies einsetzen, entstehen Ihnen weder Nachteile noch Risiken. Um unsere Komfortfunktionen zu nutzen, empfehlen wir Ihnen, die Annahme von Cookies für unser Webangebot zu erlauben. Bei Nichtannahme von Cookies kann die Funktionalität unserer Webseite eingeschränkt sein.',
    dp6Title: '6. Sicherheit',
    dp6Text: 'Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von “http://” auf “https://” wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.\n'
                + 'Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre durch uns verwalteten Daten gegen Manipulationen, Verlust, Zerstörung und gegen den Zugriff unberechtigter Personen zu schützen. Wir verbessern unsere Sicherheitsmaßnahmen fortlaufend entsprechend der technologischen Entwicklung.',
    dp7Title: '7. Kategorien von Empfängern',
    dp7Text: 'Zur Erfüllung der vorgesehenen Zwecke kann auf die jeweils erforderlichen Daten ein abteilungsübergreifender Zugriff innerhalb unseres Unternehmens stattfinden. Auch von uns eingesetzte Auftragsverarbeiter können für bestimmte Zwecke Daten erhalten, z.B. für IT-Dienstleistungen, Aktenvernichtung und Marketing. Weitere Empfänger personenbezogener Daten können darüber hinaus z. B. öffentliche Stellen, Kredit- und Finanzdienstleistungsinstitute, Rechtsanwälte und Steuerberater oder Auskunfteien sein.',
    dp8Title: '8. Übermittlung in ein Drittland oder an eine internationale Organisation',
    dp8Text: 'Eine Datenübermittlung in Drittstaaten findet nur statt, soweit dies z.B. zur Durchführung eines Vertrags erforderlich oder gesetzlich vorgeschrieben ist oder Sie uns Ihre Einwilligung erteilt haben. Im Rahmen der Wartung von IT-Komponenten ist darüber hinaus nicht auszuschließen, dass ein IT-Dienstleister aus einem Drittland (z. B. USA) in seltenen Fällen Einsicht in personenbezogene Daten erhalten könnte. Ansonsten findet keine Übermittlung von personenbezogenen Daten in Drittländer oder an eine internationale Organisation statt.',
    dp9Title: '9. Dauer der Datenspeicherung',
    dp9Text: 'Für die Dauer der Vertragsbeziehung werden die personenbezogenen Daten bei uns gespeichert, darüber hinaus betragen gesetzliche Verjährungsfristen in der Regel drei Jahre. Es gelten verschiedene Aufbewahrungs- und Dokumentationspflichten z.B. aus dem Handelsgesetzbuch (HGB) und der Abgabenordnung (AO), die bis zu zehn Jahre betragen.',
    dp10Title: '10. Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit',
    dp10Text: 'Sie haben das Recht auf Auskunft nach Art. 15 DS-GVO, das Recht auf Berichtigung nach Art. 16 DS-GVO, das Recht auf Löschung nach Art. 17 DS-GVO, das Recht auf Einschränkung der Verarbeitung nach Art. 18 DS-GVO sowie das Recht auf Datenübertragbarkeit aus Art. 20 DS-GVO. Beim Auskunfts- sowie beim Löschungsrecht gelten die Einschränkungen nach §§34 und 35 BDSG.',
    dp11Title: '11. Widerruf von Einwilligungen',
    dp11Text: 'Eine erteilte Einwilligung können Sie jederzeit widerrufen. Bitte beachten Sie, dass Ihr Widerruf erst für die Zukunft wirkt.',
    dp12Title: '12. Bestehen eines Beschwerderechts',
    dp12Text: 'Darüber hinaus haben Sie ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde (Art. 77 DS-GVO i. V. m. § 19 BDSG).',
    dp13Title: '13. Pflicht zur Bereitstellung von Daten',
    dp13Text: 'Sie müssen nur diejenigen personenbezogenen Daten bereitstellen, die für die Begründung, Durchführung und Beendigung eines Vertrags erforderlich sind oder zu deren Erhebung wir gesetzlich verpflichtet sind. Sollten Sie uns die notwendigen Informationen und Unterlagen nicht zur Verfügung stellen, dürfen wir die von Ihnen gewünschte Geschäftsbeziehung nicht aufnehmen oder fortsetzen.',
    dp14Title: '14. Automatisierte Entscheidungsfindung im Einzelfall',
    dp14Text: 'Zur Begründung und Durchführung der Geschäftsbeziehung nutzen wir grundsätzlich keine vollautomatisierte Entscheidungsfindung. Sollten wir diese Verfahren in Einzelfällen einsetzen, werden wir Sie hierüber gesondert informieren, sofern dies gesetzlich vorgegeben ist.',
    dp15Title: '15. Profiling',
    dp15Text: 'Wir verarbeiten teilweise Ihre Daten automatisiert mit dem Ziel, bestimmte persönliche Aspekte zu bewerten (Profiling), z.B. Auswertung zur zielgerichteten Kundenansprache, bedarfsgerechten Werbung einschließlich Markt- und Meinungsforschung sowie zum Scoring bzw. Rating. In die Auswertung können beispielsweise Daten zum Zahlungsverhalten (z. B. Kontoumsätze, Salden) sowie Kriterien wie Branchenzugehörigkeit und Erfahrungen aus der bisherigen Geschäftsbeziehung einfließen.',
    dp16Title: '16. Kategorien personenbezogener Daten',
    dp16Text: 'Folgende Kategorien personenbezogener Daten verarbeiten wir beispielsweise: Personenstammdaten, Daten zur Erfüllung rechtlicher Verpflichtungen, Werbedaten, Daten über Ihre Nutzung von unseren angebotenen Telemedien (z.B. Zeitpunkt des Aufrufs unserer Webseiten, Apps, angeklickte Seiten von uns bzw. Einträge) sowie andere mit den genannten Kategorien vergleichbare Daten.',
    dp17Title: '17. Datenquellen',
    dp17Text: 'Daten, die wir im Rahmen unserer Geschäftsbeziehung von Ihnen erhalten haben, verarbeiten wir ebenso wie von sonstigen Dritten zulässigerweise an uns übermittelte Daten. Zum anderen erheben wir Daten aus öffentlich zugänglichen Quellen (z. B. Branchenverzeichnisse, Handelsregister, Presse).',
    dpBoxText: 'Information über Ihr Widerspruchsrecht nach Art. 21 Datenschutz-Grundverordnung (DS-GVO)\n'
                + 'Einzelfallbezogenes Widerspruchsrecht\n'
                + 'Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Artikel 6 Abs. 1e DS-GVO (Datenverarbeitung im öffentlichen Interesse) und Artikel 6 Absatz 1f DS-GVO (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmung gestütztes Profiling. Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dient.\n'
                + 'Widerspruchsrecht gegen eine Verarbeitung von Daten für Zwecke der Direktwerbung\n'
                + 'Wir verarbeiten Ihre personenbezogenen Daten, um Direktwerbung zu betreiben. Sie haben das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Widersprechen Sie der Verarbeitung für Zwecke der Direktwerbung, so werden wir Ihre personenbezogenen Daten nicht mehr für diese Zwecke verarbeiten. Der Widerspruch kann formfrei erfolgen und sollte möglichst gerichtet werden an:\n',
    dpStatus: 'Stand September 2018',

    /**
     * legal notice
     */
    lnTitle: 'Impressum',
    lnAddress: 'Adresse:',
    lnTel: 'Telefon:',
    lnFax: 'Fax',
    lnMail: 'E-Mail:',
    lnInternet: 'Internet',
    lnPage: 'meetznow.io',

    /**
     * timeslot editing stuff
     */
    timeslotEditHeader: 'Bearbeiten',
    timeslotStart: 'Start: ',
    timeslotEnd: 'Ende: ',
    timeslotDate: 'Datum: ',
    timeslotsDateSlots: 'Zeitslots für dieses Datum: ',
    timeslot: 'Zeitslot',
    timeSlotValidation: 'Zeitslot liegt nicht in einem freien Zeitslot',
    timeSlotStartEnd: 'Startzeit sollte vor der Endzeit liegen',
    timeSlotMeeting: 'Meeting mindest Zeit ist nicht erfüllt',
    timeSlotInfo: 'Mit Rechtsklick auf einen ausgewählten Zeitslot kann man diesen löschen oder bearbeiten. Am unteren Ende kann man ihn ebenenfalls skalieren.',


    /**
     * terms of use
     */
    touTitle: 'Nutzungsbedingungen',
    tou1Title: '§ 1 Geltungsbereich',
    tou1TextPart1: '1. Die nachfolgenden Bedingungen gelten für die Nutzung der Webseite Meetznow (nachfolgend „Webseite“). Für die Nutzung der Webseite ist wichtig, dass Sie als Nutzer/in die nachfolgenden Bestimmungen akzeptieren.\n'
                + '2. Durch die Nutzung unserer Webseite sind Sie mit den Nutzungsbedingungen unserer Webseite einverstanden. Durch Ihr Einverständnis garantieren Sie uns, dass Sie keine Beiträge erstellen werden, die gegen die Nutzungsbedingungen verstoßen.\n'
                + '3. Gegenstand von Meetznow ist folgendes:',
    tou1TextPart2: 'Das Finden eines optimalen Zeitraums für Ihr nächstes Treffen, indem Sie Terminumfragen erstellen und andere daran teilnehmen lassen.',
    tou2Title: '§ 2 Kontaktdaten und rechtliche Hinweise',
    tou2Text: 'Sollten Sie Fragen bezüglich unserer Webseite haben, können Sie uns unter folgenden Kontaktdaten erreichen:',
    tou3Title: '§ 3 Elektronische Kommunikation',
    tou3Text: 'Wenn Sie Meetznow nutzen, werden wir mit Ihnen auf verschiedene Art und Weise elektronisch kommunizieren, z.B. über E-Mail, Textnachrichten oder auch durch die Veröffentlichung elektronischer Nachrichten oder sonstiger Kommunikation auf unserer Webseite oder im Rahmen sonstiger Dienste von Meetznow. Für vertragliche Zwecke stimmen Sie zu, elektronische Kommunikation von uns zu erhalten und dass alle Zustimmungen, Benachrichtigungen, Veröffentlichungen und andere Kommunikation, die wir Ihnen elektronisch mitteilen insofern keine Schriftform erfordern, es sei denn zwingend anzuwendende gesetzliche Vorschriften erfordern eine andere Form der Kommunikation.',
    tou4Title: '§ 4 Ihr Konto',
    tou4Text: '1. Der Zugang zu einigen Diensten der Webseite, setzt die Erstellung eines Kontos voraus.\n'
                + '2. Der Nutzer verpflichtet sich dazu, keine falschen Angaben zu seiner Person zu machen. Des Weiteren verpflichtet sich der Nutzer dazu, seine Angaben regelmäßig zu kontrollieren, um die Richtigkeit dieser zu gewährleisten.\n'
                + '3. Wenn Sie einen Dienst von Meetznow nutzen, sind Sie für die Sicherstellung der Vertraulichkeit Ihres Kontos, Passworts und für die Beschränkung des Zugangs zu Ihrem Computer und Ihren mobilen Geräten verantwortlich. Soweit unter anwendbaren Recht zulässig, erklären Sie sich damit einverstanden, für alle Aktivitäten verantwortlich zu sein, die über Ihr Konto oder Passwort vorgenommen werden. Sie sollten alle erforderlichen Schritte unternehmen, um sicherzustellen, dass Ihr Passwort geheim gehalten und sicher aufbewahrt wird uns Sie sollten uns unverzüglich informieren, wenn Sie Anlass zur Sorge haben, dass ein Dritter Kenntnis von Ihrem Passwort erlangt hat oder das Passwort unautorisiert genutzt wird oder dies wahrscheinlich ist. Sie sind dafür verantwortlich, sicherzustellen, dass Ihre Angaben an uns korrekt und vollständig sind und dass Sie uns von jeglichen Änderungen hinsichtlich der von Ihnen gegebenen Informationen in Kenntnis setzen. Sie können einige der Informationen, die Sie uns gegeben haben, auf unserer Webseite einsehen und aktualisieren.\n'
                + '4. Der Nutzer kann seine Daten nachträglich jederzeit ändern.'
                + '5. Sie dürfen einen Dienst von Meetznow nicht in einer Weise verwenden, die dazu geeignet ist, die Dienste oder den Zugang von Meetznow zu unterbrechen, zu beschädigen oder in sonstiger Art zu beeinträchtigen.\n'
                + '6. Des Weiteren dürfen Sie die Dienste von Meetznow nicht für betrügerische oder in Verbindung mit einer Straftat, rechtswidrigen Aktivitäten, Belästigungen oder Unannehmlichkeiten verwenden.\n'
                + '7. Wir behalten uns das Recht vor, Ihnen die Dienste der Webseite vorzuenthalten oder Mitgliedskonten zu schließen. Das gilt insbesondere für den Fall, dass Sie gegen anwendbares Recht, vertragliche Vereinbarungen oder unsere Richtlinien verstoßen.\n'
                + '8. Die Nutzer dieser Webseite können ihr Konto jederzeit löschen.\n'
                + '9. Die Webseite ist berechtigt, bei Erlöschen der Nutzungsberechtigung die von dem Nutzer bzw. der Nutzerin angelegten und unter dessen bzw. deren Nutzungsberechtigung zugänglichen Daten nach einer angemessenen Frist zu löschen.\n',
    tou5Title: '§ 5 Links zu anderen Webseiten',
    tou5Text: '1. Für Links, die nicht von uns betrieben werden und sich auf deren Webseite befinden, haben wir keinerlei Möglichkeit, den Inhalt dieser Webseite zu kontrollieren, da diese völlig unabhängig von uns ist.\n'
                + '2. Aus diesem Grund übernehmen wir keinerlei Verantwortung für die Inhalte dieser Webseiten und die Folgen ihrer Verwendung durch die Besucher dieser. Das Aufrufen aller über Links erreichbaren Webseiten geschieht auf eigene Gefahr. Es erfolgt kein gesonderter Hinweis, wenn Benutzer die Webseite verlassen.',
    tou6Title: '§ 6 Haftungsbeschränkung',
    tou6Text: 'Meetznow übernimmt keine Gewährleistung für den fehlerfreien und unterbrechungsfreien Betrieb der Webseite. Eventuelle Datenverluste sowie die Kenntnisnahme vertraulicher Daten durch unberechtigte Zugriffe Dritter können nicht ausgeschlossen werden. Insbesondere haftet die Webseite nicht für den Verlust von Daten, die aufgrund von § 4 Absatz 9 gelöscht werden.',
    tou7Title: '§ 7 Laufzeit / Beendigung des Vertrags',
    tou7Text: '1. Diese Vereinbarung wird auf unbestimmte Zeit geschlossen.\n'
                + '2. Beide Parteien können diese Vereinbarung ohne Einhaltung einer Frist kündigen. ',
};
