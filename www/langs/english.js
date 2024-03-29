// English text
// The object keys are the names of the html element they correspond to. This is just to help show how  they line up.
// Changing these will not change the element but it will break things
var constants = {
  defaultPanel: {
    li1: "Overview",
    li2: "How It Works",
    li3: "Settings",
    li4: "About Us",
    li5: "Community Guidelines",
    a: "Close",
  },
  defaultHeader: {
    h1: "Smell MyCity",
    a: "More",
  },
  defaultFooter: {
    li1: "Report",
    li2: "Map",
  }
}

var english = {
  defaultCityName: "your city",
  home: {
    firstModal: {
      a1: "Close",
      h1: "To Submit a Smell Report",
      li1: "Rate the odor on a scale of 1-5",
      li2: "Describe the smell or source of odor (recommended)",
      li3: "List any symptoms associated with the odor (optional)",
      li4: "Add any notes relevant to your report (optional)",
      li5: "Hit 'Submit Smell Report'",
      li6: "To endorse your report see Settings (recommended)",
      a2: "OK",
    },
    predictionModal: {
      a1: "Close",
      h1: "Smell Event Predictions",
      p: "We are currently testing a smell prediction model that can alert Pittsburgh residents about a potential smell event in the area. The predictions' accuracy should improve as we receive more smell reports to verify our algorithm. We hope these notifications are useful to you!",
      a2: "OK",
    },
    panel: constants.defaultPanel,
    header: constants.defaultHeader,
    rating: {
      h3: "How does your air smell right now in <span class='your-city'>your city</span>?",
      input1: " 1 Just fine!",
      input2: " 2 Barely noticeable",
      input3: " 3 Definitely noticeable",
      input4: " 4 It's getting pretty bad",
      input5: " 5 About as bad as it gets!",
    },
    describe: {
      label: "Describe the smell: ",
      span: "(recommended)",
      placeholder: "e.g. industrial, woodsmoke, rotten-eggs",
    },
    symptoms: {
      label: "List symptoms linked to odor: ",
      span: "(optional)",
      placeholder: "e.g. headache, sore throat, eye irritation",
    },
    note: {
      label: "Additional notes or comments: ",
      span: "(optional)",
      placeholder: "e.g. if you submit more than one report in the same day",
    },
    custom: {
      label1: "Report Current Time/Location",
      label2: "Uncheck this box to manually select a time and location for the smell report.",
      label3: "Report Location",
      button: "Current Location (default)",
      label4: "Report Time",
      option: "Now",
    },
    disclaimer: "Please only enter information that you are comfortable with sharing anonymously on the public Smell MyCity map.<br><br>Also, please refrain from using offensive language in your report. We are replacing expletives with asterisks to keep this space safe for all.",
    regulatoryAgencyNote: "All smell reports within <span class='regulatory-region-name'></span> will be forwarded to the <span class='regulatory-agency-name'></span>. If you'd like to receive correspondence from them, enter your contact info in the settings tab.",
    button: "Submit Smell Report",
    footer: constants.defaultFooter
  },
  map: {
    modal: {
      a1: "Close",
      h1: "Using The Map",
      li1: "This map shows smell reports from across the U.S.",
      li2: "Click on the location button to select a specific region",
      li3: "Tap on a smell report (triangle) or monitoring station (circle) to view more details",
      li4: "We offset smell report locations to protect your privacy",
      li5: "Scroll through the timeline at the bottom to view reports from any day",
      li6: "Darker shades indicate a higher volume of pollution odor reports",
      a2: "OK",
    },
    newCity: {
      h3: "Welcome to <span class='your-city'>your city</span>",
      p: "current AQI is: <span class='aqi'>unknown</span>",
    },
    panel: constants.defaultPanel,
    header: constants.defaultHeader,
    iframeWarning: "Your device does not support iframes.",
    footer: constants.defaultFooter,
  },
  settings: {
    panel: constants.defaultPanel,
    header: {
      h1: "Settings",
      a: constants.defaultHeader.a,
    },
    contact: {
      h3: "Contact Information",
      label: "These fields are optional. Contact information is only shared with the relevant local regulatory agency, if they are connected with the Smell MyCity app.",
      label2: " Signing your name on smell reports to the regulatory agency provides more authenticity to the report, and enables that agency to follow up with you if necessary.",
      regulatoryAgencyNote: "All smell reports within <span class='regulatory-region-name'></span> will be forwarded to the <a href='#' target='_blank' class='regulatory-agency-website'></a>.",
      placeholder1: "name (recommended)",
      placeholder2: "email (recommended)",
      placeholder3: "mailing address (optional)",
      placeholder4: "phone number (optional)",
    },
    notification: {
      h3: "Notifications",
      label1: "Activate notifications that are important to you",
      label2: "Smell MyCity Notifications",
      label3: "Note: These notifications will pop up roughly once a week.",
      label4: "Air Quality Index Changes",
      label5: "(notifications about pgh air quality conditions)", //???
    },
    lang: {
      h3: "Language",
      label: "Select your prefered language",
      l0: Constants.LANGUAGES[0],
      l1: Constants.LANGUAGES[1],
    },
    footer: constants.defaultFooter,
  },
  startup: {
    header: constants.defaultHeader,
    h3: "Welcome to Smell MyCity!",
    p1: "Thank you for installing the Smell MyCity App!",
    p2: "Smell MyCity is powered by the CMU CREATE Lab and Seventh Generation. It is designed to track pollution odors across our cities. If you detect a foul odor while you're outside, please report it through this app.",
    p3: "We are also taking steps to make Smell MyCity reports available to local regulatory agencies.",
    footer: "Continue",
    lang: {
      h3: "Language",
      label: "Select your prefered language",
      l0: Constants.LANGUAGES[0],
      l1: Constants.LANGUAGES[1],
    },
  },
  //Contains only text for HTML objects, use updates.js to change footer link locaitons
  updates: {
    header: constants.defaultHeader,
    h3: "New Update For Smell My City!",
    p1: "We've added notifications to this app! See Settings for more details.",
    footer: {
              li1: "See new features",
              li2: "Ok",}
  },
  maperror: {
    panel: constants.defaultPanel,
    header: constants.defaultHeader,
    h3: "Map Service Unavailable",
    p1: "Sorry, it seems we're experiencing issues with loading the map. Please try again later.",
    footer: constants.defaultFooter,
  },
  overview: {
    panel: constants.defaultPanel,
    header: {
      h1: "App Overview",
      a: constants.defaultHeader.a,
    },
    h2_1: "What is Smell MyCity?",
    p1: "Smell MyCity is a smartphone app designed to crowdsource reports of pollution odors travelling through our cities. All smell reports submitted through the app are visible on our map, and this information is publicly available through our website (smellmycity.org). Local residents, organizations and regulators can use smell report data to help track down potential sources of pollution in their neighborhood.",
    h2_2: "Why Focus on Smells?",
    p2: "Air quality is usually invisible to us; however, air pollution can have very real, long term impacts on our health and quality of life. Foul odors outside are typically symptoms of a serious pollution problem in our region. We, our children, our friends and families all breathe in this air. If our air smells toxic, then we are likely inhaling toxins.",
    h2_3: "Who Can Use Smell MyCity?",
    p3: "Anyone in the U.S. can submit a smell report through Smell MyCity! This app was designed for a national audience. Any community can use the Smell MyCity app to collectively document pollution odors in their neighborhood, and use that data to advocate for better air quality. We have worked closely with community partners in a few cities to connect smell report data from those locations to relevant local regulatory agencies. If you are interested in partnering with us to connect your community's data to local regulators, please contact us at: info@smellmycity.org",
    h2_4: "Where Was Smell MyCity Developed?",
    p4: "Smell MyCity was developed by the <a href='https://cmucreatelab.org' target='_blank'>CMU CREATE Lab</a>, as an extension of their Smell Pittsburgh (<a href='https://smellpgh.org' target='_blank'>Smell PGH</a>) app, which was deployed in 2016. Smell PGH has activated local residents, and provided the local health department with a higher resolution of pollution data to help track down potential sources. Given the successful implementation of this smell reporting app in Pittsburgh, the CREATE Lab developed the Smell MyCity app to bring this technology to residents across the U.S. Smell MyCity will be first piloted in Louisville, KY and Portland, OR, in collaboration with local advocacy and community groups.",
    p5: "Smell MyCity was developed with support from <a href='http://www.heinz.org/' target='_blank'>The Heinz Endowments</a>, which works toward building a Pittsburgh region that thrives as a whole and just community. The launch of Smell MyCity into cities across the U.S. is powered by <a href='https://www.seventhgeneration.com/insideSVG/mission' target='_blank'>Seventh Generation</a>, which is committed to <a href='https://www.seventhgeneration.com/action/climate-justice-equity' target='_blank'>Climate Justice & Equity</a> for the next seven generations and beyond. Thanks to these contributions, the Smell MyCity app will be made available to residents across the country, so that we all have an opportunity to join a larger, nationwide community of citizens actively documenting the human impacts of air pollution.",
    h2_5: "Smell MyCity Data",
    p6: "Anyone can access Smell MyCity data from our website: <a href='https://smellmycity.org' target='_blank'>smellmycity.org</a>.",
    p7: "We take every precaution to protect any personally identifiable data. All information shown on the public map visualization for Smell MyCity is anonymized and location data is skewed to protect your privacy. Personal contact information you enter in the settings tab is only made available to the relevant local regulatory agency. Our backend database only contains anonymous User ID's created by your app service (Apple or Google Play).",
    version: "version: ###",
    footer: constants.defaultFooter,
  },
  about: {
    panel: constants.defaultPanel,
    header: {
      h1: "About Us",
      a: constants.defaultHeader.a,
    },
    h2_1: "The CREATE Lab",
    p1: "The Community Robotics, Education and Technology Empowerment Lab (<a href='https://cmucreatelab.org' target='_blank'>CMU CREATE Lab</a>) at Carnegie Mellon University, explores socially meaningful innovation and deployment of robotic technologies. CREATE is both a technology innovator and a community partner; this unique combination enables the creation of community-based technologies that help empower citizens to realize their vision for a better quality of life.",
    h2_2: "Seventh Generation",
    p2: "<a href='https://www.seventhgeneration.com' target='_blank'>Seventh Generation</a> is a sustainable home cleaning product company, based in Burlington, Vermont. For the past 30 years, Seventh Generation has been committed to using business as a force for good. The company partners with like-minded organizations, like CREATE Lab, to advocate for the rights of people and the planet because they believe that a company's values are as important as the products it makes. Seventh Generation knows that plant-based products can provide the efficacy you are looking for, and that products designed from renewable plant-based ingredients are a more sustainable option than ingredients made from petroleum. Above all, they believe that we have a responsibility to this generation and the next seven, and invite us all on their journey to nurture the health of the next seven generations.",
    p3: "In 2018, Seventh Generation partnered with the Sierra Club's <a href='https://www.sierraclub.org/ready-for-100' target='_blank'>Ready for 100 campaign</a> asking cities across the country to commit to 100% renewable energy. This effort is in service of a healthier future for all -- a move to 100% renewable energy will help reduce negative health effects (like asthma) caused by burning fossil fuels.",
    p4: "Join the movement for 100% clean energy. Over 100 cities have committed to running on clean energy by 2035 -- is your city #Readyfor100? <a href='https://act.sierraclub.org/actions/National?actionId=AR0032635&id=70131000001LzlBAAS' target='_blank'>Ask your city to commit today</a>!",
    h2_3: "The Heinz Endowments",
    p5: "<a href='http://www.heinz.org/' target='_blank'>The Heinz Endowments</a> seeks to help our region thrive as a whole and just community, and through that work to model solutions to major national and global challenges. We are based in Pittsburgh, Pennsylvania, where we concentrate on advancing a sustainable future for our community and planet, successful learning outcomes for young people and their families, and a culture of engaged creativity for all our citizens.",
    h2_4: "Local Partners",
    footer: constants.defaultFooter,
  },
  howitworks: {
    panel: constants.defaultPanel,
    header: {
      h1: "How It Works",
      a: constants.defaultHeader.a,
    },
    p1: "The basic function of the Smell MyCity app is as follows:",
    li1: "Submit a smell report:",
    li2: "Launch the app and pick a rating for the smell you experience (from 1 through 5)",
    li3: "Add a description of the smell (optional, but highly recommended)",
    li4: "Hit 'Submit Smell Report'",
    li5: "Please only enter information that you are comfortable with sharing anonymously on the public Smell MyCity map",
    li6: "Check out the Smell MyCity map:",
    li7: "Once submitted, all smell reports show up on the public Smell MyCity map",
    li8: "Smell reports will be represented by triangle icons",
    li9: "The color of each report's icon will match the given smell rating",
    li10: "Tapping on a smell report icon will reveal details about that report",
    li11: "To protect your privacy, the location of each report is shifted slightly on the map",
    li12: "No personally identifiable information is shown on the map",
    li13: "Circle icons represent federal PM2.5 sensors - tap those icons for more info",
    li14: "If you are in a location where the regulatory agency is connected with the app, they will receive information about your report, including:",
    li15: "Your name and contact information, if you chose to enter those under 'Settings'",
    li16: "The location of the smell (based on the GPS location of your phone)",
    li17: "Date, time and rating of the smell report",
    li18: "Description, symptoms and notes included in the smell report, if any.",
    footer: constants.defaultFooter,
  },
  communityguidelines: {
    panel: constants.defaultPanel,
    header: {
      h1: "Guidelines",
      a: constants.defaultHeader.a,
    },
    h2_1: "Community Guidelines",
    p1: "The Smell MyCity app was developed with and for the community. As such, the app reports and data are publicly sourced, collaboratively curated, and collectively utilized by neighbors across the country. <b>We rely on trust within this community to engage with the Smell MyCity app in such a way that is respectful, kind and honest.</b>",
    p2: "Our goal is to build and maintain a platform that is welcoming and safe for all users. In this spirit, we kindly ask that you are considerate and mindful with the language you use in comments posted through the app. To enable everyone to freely express themselves, while also ensuring that the app continues to be a welcoming platform for everyone, we will be redacting offensive or harmful language on the public Smell MyCity map and in data downloads.",
    note: "<i>* Note that we will retain a copy of the original text in order to verify that our redaction process is functioning accurately.</i>",
    footer: constants.defaultFooter,
  }
}
