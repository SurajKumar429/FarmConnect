const express = require('express');
const router = express.Router();

// Knowledge base for farming-related questions
const farmingKnowledge = {
  cropCare: {
    en: "To care for crops, ensure proper watering, adequate sunlight, and regular monitoring. Water crops early in the morning or late evening. Remove weeds regularly and check for signs of disease or pests. Use organic fertilizers and maintain proper spacing between plants.",
    hi: "फसलों की देखभाल के लिए, उचित पानी, पर्याप्त धूप और नियमित निगरानी सुनिश्चित करें। सुबह जल्दी या शाम को देर से फसलों को पानी दें। नियमित रूप से खरपतवार हटाएं और बीमारी या कीटों के संकेतों की जांच करें। जैविक उर्वरक का उपयोग करें और पौधों के बीच उचित दूरी बनाए रखें।",
    or: "ଫସଲର ଯତ୍ନ ନେବା ପାଇଁ, ଉଚିତ ଜଳସେଚନ, ପର୍ଯ୍ୟାପ୍ତ ସୂର୍ଯ୍ୟାଲୋକ, ଏବଂ ନିୟମିତ ନିରୀକ୍ଷଣ ନିଶ୍ଚିତ କରନ୍ତୁ। ସକାଳେ ବିଳମ୍ବରେ କିମ୍ବା ସନ୍ଧ୍ୟାରେ ଫସଲକୁ ପାଣି ଦିଅନ୍ତୁ। ନିୟମିତ ଭାବରେ ଘାସ ହଟାନ୍ତୁ ଏବଂ ରୋଗ କିମ୍ବା କୀଟର ଚିହ୍ନ ଯାଞ୍ଚ କରନ୍ତୁ। ଜୈବିକ ସାର ବ୍ୟବହାର କରନ୍ତୁ ଏବଂ ଉଦ୍ଭିଦ ମଧ୍ୟରେ ଉଚିତ ଦୂରତା ବଜାୟ ରଖନ୍ତୁ।"
  },
  pestControl: {
    en: "For pest control, use integrated pest management (IPM). Start with preventive measures like crop rotation and companion planting. Use natural predators like ladybugs. Apply organic pesticides like neem oil or garlic spray. Monitor crops regularly and remove infected plants immediately.",
    hi: "कीट नियंत्रण के लिए, एकीकृत कीट प्रबंधन (IPM) का उपयोग करें। फसल चक्र और साथी रोपण जैसे निवारक उपायों से शुरुआत करें। लेडीबग जैसे प्राकृतिक शिकारियों का उपयोग करें। नीम के तेल या लहसुन स्प्रे जैसे जैविक कीटनाशक लगाएं। नियमित रूप से फसलों की निगरानी करें और संक्रमित पौधों को तुरंत हटा दें।",
    or: "କୀଟ ନିୟନ୍ତ୍ରଣ ପାଇଁ, ସମନ୍ୱିତ କୀଟ ପ୍ରବନ୍ଧନ (IPM) ବ୍ୟବହାର କରନ୍ତୁ। ଫସଲ ଘୂର୍ଣ୍ଣନ ଏବଂ ସାଥୀ ରୋପଣ ଭଳି ପ୍ରତିଷେଧାତ୍ମକ ଉପାୟରୁ ଆରମ୍ଭ କରନ୍ତୁ। ଲେଡିବଗ୍ ଭଳି ପ୍ରାକୃତିକ ଶିକାରୀ ବ୍ୟବହାର କରନ୍ତୁ। ନିମ ତେଲ କିମ୍ବା ରସୁଣ ସ୍ପ୍ରେ ଭଳି ଜୈବିକ କୀଟନାଶକ ପ୍ରୟୋଗ କରନ୍ତୁ। ନିୟମିତ ଭାବରେ ଫସଲ ନିରୀକ୍ଷଣ କରନ୍ତୁ ଏବଂ ସଂକ୍ରମିତ ଉଦ୍ଭିଦକୁ ତୁରନ୍ତ ହଟାନ୍ତୁ।"
  },
  fertilizer: {
    en: "For fertilizers, use organic options like compost, manure, or vermicompost. Apply fertilizers based on soil testing. Nitrogen-rich fertilizers are good for leafy vegetables, while phosphorus and potassium are important for root and fruit development. Apply fertilizers during the growing season and water well after application.",
    hi: "उर्वरकों के लिए, खाद, गोबर, या वर्मीकम्पोस्ट जैसे जैविक विकल्पों का उपयोग करें। मिट्टी की जांच के आधार पर उर्वरक लगाएं। नाइट्रोजन युक्त उर्वरक पत्तेदार सब्जियों के लिए अच्छे होते हैं, जबकि फॉस्फोरस और पोटेशियम जड़ और फल के विकास के लिए महत्वपूर्ण हैं। बढ़ते मौसम के दौरान उर्वरक लगाएं और लगाने के बाद अच्छी तरह से पानी दें।",
    or: "ସାର ପାଇଁ, କମ୍ପୋଷ୍ଟ, ଗୋବର, କିମ୍ବା ଭର୍ମିକମ୍ପୋଷ୍ଟ ଭଳି ଜୈବିକ ବିକଳ୍ପ ବ୍ୟବହାର କରନ୍ତୁ। ମାଟି ପରୀକ୍ଷା ଉପରେ ଆଧାର କରି ସାର ପ୍ରୟୋଗ କରନ୍ତୁ। ନାଇଟ୍ରୋଜେନ୍-ସମୃଦ୍ଧ ସାର ପତ୍ରଯୁକ୍ତ ଶାକସବଜି ପାଇଁ ଭଲ, ଯେତେବେଳେ ଫସଫରସ୍ ଏବଂ ପୋଟାସିୟମ୍ ମୂଳ ଏବଂ ଫଳ ବିକାଶ ପାଇଁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ବୃଦ୍ଧି ଋତୁରେ ସାର ପ୍ରୟୋଗ କରନ୍ତୁ ଏବଂ ପ୍ରୟୋଗ ପରେ ଭଲ ଭାବରେ ପାଣି ଦିଅନ୍ତୁ।"
  },
  irrigation: {
    en: "For irrigation, water crops early morning or late evening to reduce evaporation. Use drip irrigation or soaker hoses for efficient water use. Water deeply but less frequently to encourage deep root growth. Check soil moisture before watering. Mulch around plants to retain moisture.",
    hi: "सिंचाई के लिए, वाष्पीकरण को कम करने के लिए सुबह जल्दी या शाम को देर से फसलों को पानी दें। कुशल जल उपयोग के लिए ड्रिप सिंचाई या सोकर होज़ का उपयोग करें। गहरी जड़ वृद्धि को प्रोत्साहित करने के लिए गहराई से लेकिन कम बार पानी दें। पानी देने से पहले मिट्टी की नमी जांचें। नमी बनाए रखने के लिए पौधों के चारों ओर मल्च लगाएं।",
    or: "ସିଞ୍ଚାଇ ପାଇଁ, ବାଷ୍ପୀକରଣ ହ୍ରାସ କରିବା ପାଇଁ ସକାଳେ ବିଳମ୍ବରେ କିମ୍ବା ସନ୍ଧ୍ୟାରେ ଫସଲକୁ ପାଣି ଦିଅନ୍ତୁ। କାର୍ଯ୍ୟକ୍ଷମ ଜଳ ବ୍ୟବହାର ପାଇଁ ଡ୍ରିପ୍ ସିଞ୍ଚାଇ କିମ୍ବା ସୋକର୍ ହୋଜ୍ ବ୍ୟବହାର କରନ୍ତୁ। ଗଭୀର ମୂଳ ବୃଦ୍ଧି ଉତ୍ସାହିତ କରିବା ପାଇଁ ଗଭୀର ଭାବରେ କିନ୍ତୁ କମ୍ ବାରମ୍ବାର ପାଣି ଦିଅନ୍ତୁ। ପାଣି ଦେବା ପୂର୍ବରୁ ମାଟିର ଆର୍ଦ୍ରତା ଯାଞ୍ଚ କରନ୍ତୁ। ଆର୍ଦ୍ରତା ରଖିବା ପାଇଁ ଉଦ୍ଭିଦ ଚାରିପାଖରେ ମଲ୍ଚ୍ ଲଗାନ୍ତୁ।"
  },
  harvesting: {
    en: "For harvesting, pick crops at the right maturity stage. Harvest in the early morning when temperatures are cooler. Use clean, sharp tools to avoid damaging plants. Handle produce gently to prevent bruising. Store harvested crops in a cool, dry place. Some crops like tomatoes continue to ripen after picking.",
    hi: "फसल कटाई के लिए, सही परिपक्वता अवस्था में फसलें तोड़ें। जब तापमान ठंडा हो तो सुबह जल्दी कटाई करें। पौधों को नुकसान से बचाने के लिए साफ, तेज उपकरणों का उपयोग करें। चोट लगने से बचाने के लिए उत्पाद को धीरे से संभालें। कटाई की गई फसलों को ठंडी, सूखी जगह पर संग्रहीत करें। टमाटर जैसी कुछ फसलें तोड़ने के बाद भी पकती रहती हैं।",
    or: "ଫସଲ କଟାଇ ପାଇଁ, ସଠିକ୍ ପରିପକ୍ୱତା ଅବସ୍ଥାରେ ଫସଲ ବାଛନ୍ତୁ। ଯେତେବେଳେ ତାପମାତ୍ରା ଥଣ୍ଡା ହୁଏ ସେତେବେଳେ ସକାଳେ ବିଳମ୍ବରେ କଟାଇ କରନ୍ତୁ। ଉଦ୍ଭିଦକୁ କ୍ଷତିରୁ ବଞ୍ଚାଇବା ପାଇଁ ପରିଷ୍କାର, ତୀକ୍ଷ୍ଣ ଉପକରଣ ବ୍ୟବହାର କରନ୍ତୁ। କ୍ଷତି ରୋକିବା ପାଇଁ ଉତ୍ପାଦକୁ ଧୀରେ ଧୀରେ ହ୍ୟାଣ୍ଡଲ୍ କରନ୍ତୁ। କଟାଇ ହୋଇଥିବା ଫସଲକୁ ଏକ ଥଣ୍ଡା, ଶୁଷ୍କ ସ୍ଥାନରେ ସଂରକ୍ଷଣ କରନ୍ତୁ। ଟମାଟୋ ଭଳି କିଛି ଫସଲ ବାଛିବା ପରେ ମଧ୍ୟ ପାଚିବା ଜାରି ରଖନ୍ତି।"
  }
};

// Function to detect language from message
const detectLanguage = (message) => {
  const hindiPattern = /[\u0900-\u097F]/;
  const odiaPattern = /[\u0B00-\u0B7F]/;
  
  if (hindiPattern.test(message)) return 'hi';
  if (odiaPattern.test(message)) return 'or';
  return 'en';
};

// Function to find relevant answer
const findAnswer = (message, lang) => {
  const lowerMessage = message.toLowerCase();
  
  // Crop care
  if (lowerMessage.includes('crop') && (lowerMessage.includes('care') || lowerMessage.includes('grow') || lowerMessage.includes('maintain'))) {
    return farmingKnowledge.cropCare[lang];
  }
  
  // Pest control
  if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('disease')) {
    return farmingKnowledge.pestControl[lang];
  }
  
  // Fertilizer
  if (lowerMessage.includes('fertilizer') || lowerMessage.includes('fertiliser') || lowerMessage.includes('nutrient') || lowerMessage.includes('manure')) {
    return farmingKnowledge.fertilizer[lang];
  }
  
  // Irrigation
  if (lowerMessage.includes('water') || lowerMessage.includes('irrigation') || lowerMessage.includes('watering')) {
    return farmingKnowledge.irrigation[lang];
  }
  
  // Harvesting
  if (lowerMessage.includes('harvest') || lowerMessage.includes('pick') || lowerMessage.includes('collect')) {
    return farmingKnowledge.harvesting[lang];
  }
  
  // Default response
  const defaultResponses = {
    en: "I'm here to help with farming questions! You can ask me about crop care, pest control, fertilizers, irrigation, harvesting, or any other farming-related topic. What would you like to know?",
    hi: "मैं कृषि प्रश्नों में मदद के लिए यहां हूं! आप मुझसे फसल देखभाल, कीट नियंत्रण, उर्वरक, सिंचाई, फसल कटाई, या किसी अन्य कृषि-संबंधी विषय के बारे में पूछ सकते हैं। आप क्या जानना चाहेंगे?",
    or: "ମୁଁ କୃଷି ପ୍ରଶ୍ନରେ ସାହାଯ୍ୟ କରିବା ପାଇଁ ଏଠାରେ ଅଛି! ଆପଣ ମୋଠାରୁ ଫସଲ ଯତ୍ନ, କୀଟ ନିୟନ୍ତ୍ରଣ, ସାର, ସିଞ୍ଚାଇ, ଫସଲ କଟାଇ, କିମ୍ବା ଅନ୍ୟ କୃଷି-ସମ୍ବନ୍ଧୀୟ ବିଷୟ ବିଷୟରେ ପଚାରିପାରନ୍ତି। ଆପଣ କଣ ଜାଣିବାକୁ ଚାହାନ୍ତି?"
  };
  
  return defaultResponses[lang];
};

// POST /api/chatbot
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message is required and must be a non-empty string' 
      });
    }
    
    const detectedLang = detectLanguage(message);
    const response = findAnswer(message, detectedLang);
    
    res.json({ 
      message: response,
      detectedLanguage: detectedLang
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing your message' 
    });
  }
});

module.exports = router;

