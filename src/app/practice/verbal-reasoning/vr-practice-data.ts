
export interface Question {
  passageIndex: number;
  type: 'Inference' | 'Direct Retrieval' | 'T/F/CT' | 'Calculation/Analysis' | 'Inference/Conclusion';
  text: string;
  options: string[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface Passage {
  index: number;
  text: string;
}

export const allPassages: Passage[] = [
  {
    index: 0,
    text: `Artificial colour was once the province of alchemy and accident. The first synthetic dye was mauve, discovered in 1856 by William Henry Perkin, an 18-year-old English chemist. He was attempting to synthesise quinine, a malarial drug, but instead produced a black, sticky mess that, when diluted with alcohol, yielded a brilliant purple liquid. Perkin patented his discovery, set up a factory, and within a few years, mauve was the height of fashion. It was a triumph of chemistry over nature, replacing the expensive and unreliable natural purple dyes extracted from molluscs (Tyrian purple) or lichens. However, mauve’s reign was short-lived as other, more stable synthetic dyes soon followed, like Prussian blue and alizarin. Perkin’s true legacy was not mauve itself, but the demonstration that synthetic chemistry could create valuable commercial products, sparking the birth of the modern chemical industry. A key advantage of Perkin's mauve, and many subsequent synthetic dyes, was their superior lightfastness compared to many natural dyes which faded quickly, especially under the new gas-lamp illumination common in Victorian homes and streets.`
  },
  {
    index: 1,
    text: `By the late seventeenth century, London had more than 2,000 coffeehouses, each serving as a hub for specific trades or intellectual circles. For a penny, any man could enter, read the newspapers, and engage in conversation. Lloyd's Coffee House, for instance, became the world's leading insurance market. Others were frequented by scientists, writers, or merchants. These establishments were dubbed 'penny universities' because they fostered learning and debate accessible to a wide range of social classes, though primarily men. The coffeehouse boom coincided with the rise of the newspaper and the public sphere, creating an environment where information and ideas could circulate rapidly. However, they were not without critics. Some saw them as dens of idleness and political agitation. King Charles II even attempted to suppress them in 1675, fearing they were breeding grounds for sedition, but public outcry forced him to retract the proclamation. The coffeehouse culture eventually declined with the rise of private clubs and the increasing affordability of newspapers for home consumption.`
  },
  {
    index: 2,
    text: `By mid-nineteenth-century Europe, an all-water link between the Mediterranean and the Red Sea, and thus to India and East Asia, had been a dream for centuries. The ancient Egyptians had constructed canals connecting the Nile to the Red Sea, but these had long since fallen into disrepair. The Venetian Republic, dominant in the spice trade, had also explored the idea. However, it was Ferdinand de Lesseps, a French diplomat, who finally brought the Suez Canal to fruition. Construction began in 1859, employing tens of thousands of forced labourers, many of whom perished under harsh conditions. The canal, 101 miles long, opened in 1869 with great fanfare. It dramatically reduced shipping times and distances between Europe and Asia, for instance, cutting the voyage from London to Mumbai by about 4,500 miles. Politically, it was a strategic masterpiece for Britain, which gained effective control of the canal in 1882, securing its imperial interests in India. The canal's construction also spurred innovations in dredging technology and large-scale earth-moving.`
  },
  {
    index: 3,
    text: `Recent excavations near the ancient port of Byblos have uncovered cedar-wood tablets inscribed with a previously unknown script, dating back to approximately 1800 BCE. This script, termed the Byblos syllabary, consists of around 100 distinct signs, suggesting it is syllabic rather than alphabetic (like Phoenician) or logographic (like Egyptian hieroglyphs). Its discovery is significant because it predates the earliest known Phoenician alphabet by several centuries and originates from a region considered a crucible for alphabetic writing. Scholars are currently attempting to decipher the Byblos syllabary, hoping it will shed light on the complex transition from earlier writing systems to the alphabet. One tablet appears to be a merchant's account, listing quantities of goods like wine and oil, while another seems to be a hymn or prayer. The cedar wood itself is remarkable, preserved for millennia due to Byblos's unique coastal microclimate and the resinous nature of the wood. This find underscores Byblos's role as a major commercial and cultural crossroads in the ancient Near East.`
  }
  // Add more passages as needed
];


export const allQuestions: Question[] = [
  { 
    passageIndex: 0, 
    type: 'Inference', 
    text: "According to the passage, what single advantage first enabled Perkin's mauve to out-compete natural purple dyes?", 
    options: ["It cost a fraction of the price of Tyrian purple.", "It could be applied equally well to cotton and silk.", "It reached the market before Prussian blue and alizarin.", "It resisted fading when exposed to gas-lamp light."], 
    correctAnswer: "D", 
    explanation: "The passage states, 'A key advantage of Perkin's mauve...was their superior lightfastness compared to many natural dyes which faded quickly, especially under the new gas-lamp illumination'. While cost and applicability might be general advantages of synthetics, the passage specifically highlights lightfastness in the context of out-competing natural dyes under new lighting conditions. Option A is plausible but not explicitly stated as the *single advantage* that *first* enabled it to out-compete. Option B is not mentioned. Option C is incorrect as Prussian blue and alizarin were other synthetic dyes that followed, implying mauve was first."
  },
  {
    passageIndex: 0,
    type: 'Direct Retrieval',
    text: "William Henry Perkin discovered mauve while attempting to synthesise which substance?",
    options: ["Alizarin", "Prussian blue", "Quinine", "Tyrian purple"],
    correctAnswer: "C",
    explanation: "The passage states, 'He was attempting to synthesise quinine, a malarial drug, but instead produced a black, sticky mess that...yielded a brilliant purple liquid.'"
  },
  {
    passageIndex: 0,
    type: 'T/F/CT',
    text: "Perkin's mauve dye remained the leading synthetic dye for several decades after its discovery.",
    options: ["True", "False", "Can't Tell"],
    correctAnswer: "B",
    explanation: "The passage states, 'However, mauve’s reign was short-lived as other, more stable synthetic dyes soon followed'. This indicates it did not lead for several decades."
  },
  {
    passageIndex: 0,
    type: 'Inference/Conclusion',
    text: "What was the most significant long-term impact of Perkin's discovery, according to the passage?",
    options: ["It made purple clothing accessible to the general public.", "It demonstrated the commercial potential of synthetic chemistry.", "It led to the invention of gas-lamp illumination.", "It replaced all natural dyes in the textile industry."],
    correctAnswer: "B",
    explanation: "The passage explicitly states, 'Perkin’s true legacy was not mauve itself, but the demonstration that synthetic chemistry could create valuable commercial products, sparking the birth of the modern chemical industry.'"
  },
  // Passage 1 Questions
  {
    passageIndex: 1,
    type: 'Direct Retrieval',
    text: "What was the approximate number of coffeehouses in London by the late seventeenth century?",
    options: ["200", "1,000", "2,000", "More than 5,000"],
    correctAnswer: "C",
    explanation: "The passage begins with 'By the late seventeenth century, London had more than 2,000 coffeehouses...'"
  },
  {
    passageIndex: 1,
    type: 'Inference',
    text: "Why were coffeehouses referred to as 'penny universities'?",
    options: ["They charged a penny for university-level lectures.", "They were places where anyone could learn and debate for a low entry cost.", "They were exclusively attended by university students.", "They offered formal educational courses for a penny."],
    correctAnswer: "B",
    explanation: "The passage states, 'These establishments were dubbed \'penny universities\' because they fostered learning and debate accessible to a wide range of social classes, though primarily men' for a penny entry."
  },
  {
    passageIndex: 1,
    type: 'T/F/CT',
    text: "King Charles II successfully banned coffeehouses in 1675.",
    options: ["True", "False", "Can't Tell"],
    correctAnswer: "B",
    explanation: "The passage says, 'King Charles II even attempted to suppress them in 1675...but public outcry forced him to retract the proclamation.' Therefore, he did not successfully ban them."
  },
  {
    passageIndex: 1,
    type: 'Inference/Conclusion',
    text: "What was a primary reason for the eventual decline of coffeehouse culture mentioned in the passage?",
    options: ["Government suppression.", "The rise of tea consumption.", "Increased cost of coffee beans.", "The growth of private clubs and home newspaper access."],
    correctAnswer: "D",
    explanation: "The passage concludes with, 'The coffeehouse culture eventually declined with the rise of private clubs and the increasing affordability of newspapers for home consumption.'"
  },
  // Passage 2 Questions
  {
    passageIndex: 2,
    type: 'Direct Retrieval',
    text: "Who was primarily responsible for the construction of the Suez Canal?",
    options: ["The Venetian Republic", "The ancient Egyptians", "Ferdinand de Lesseps", "The British government"],
    correctAnswer: "C",
    explanation: "The passage states, 'However, it was Ferdinand de Lesseps, a French diplomat, who finally brought the Suez Canal to fruition.'"
  },
  {
    passageIndex: 2,
    type: 'Inference',
    text: "What was a major negative aspect associated with the construction of the Suez Canal?",
    options: ["It caused significant environmental damage.", "It led to a war between France and Britain.", "It involved the death of many forced labourers.", "It was financially unprofitable for decades."],
    correctAnswer: "C",
    explanation: "The passage mentions, 'Construction began in 1859, employing tens of thousands of forced labourers, many of whom perished under harsh conditions.'"
  },
  {
    passageIndex: 2,
    type: 'T/F/CT',
    text: "The Suez Canal's construction was completed without any significant technological innovations.",
    options: ["True", "False", "Can't Tell"],
    correctAnswer: "B",
    explanation: "The passage concludes, 'The canal's construction also spurred innovations in dredging technology and large-scale earth-moving,' indicating there were technological innovations."
  },
  {
    passageIndex: 2,
    type: 'Inference/Conclusion',
    text: "Which nation gained the most strategic political advantage from the Suez Canal shortly after its opening, according to the passage?",
    options: ["France", "Egypt", "The Venetian Republic", "Britain"],
    correctAnswer: "D",
    explanation: "The passage states, 'Politically, it was a strategic masterpiece for Britain, which gained effective control of the canal in 1882, securing its imperial interests in India.'"
  },
  // Passage 3 Questions
  {
    passageIndex: 3,
    type: 'Direct Retrieval',
    text: "The Byblos syllabary script consists of approximately how many distinct signs?",
    options: ["20-30 (alphabetic)", "Around 100 (syllabic)", "Several hundred (logographic)", "Over a thousand (complex hieroglyphic)"],
    correctAnswer: "B",
    explanation: "The passage states, 'This script, termed the Byblos syllabary, consists of around 100 distinct signs, suggesting it is syllabic...'"
  },
  {
    passageIndex: 3,
    type: 'Inference',
    text: "Why is the discovery of the Byblos syllabary considered particularly significant by scholars?",
    options: ["It is the oldest known writing system in the world.", "It proves cedar wood can last indefinitely.", "It predates the Phoenician alphabet and is from a key region for alphabetic development.", "It is written in a language directly ancestral to modern English."],
    correctAnswer: "C",
    explanation: "The passage explains its significance: 'it predates the earliest known Phoenician alphabet by several centuries and originates from a region considered a crucible for alphabetic writing.'"
  },
  {
    passageIndex: 3,
    type: 'T/F/CT',
    text: "All the inscribed tablets found at Byblos contain records of commercial transactions.",
    options: ["True", "False", "Can't Tell"],
    correctAnswer: "B",
    explanation: "The passage mentions, 'One tablet appears to be a merchant's account...while another seems to be a hymn or prayer,' indicating not all were commercial."
  },
  {
    passageIndex: 3,
    type: 'Inference/Conclusion',
    text: "What factor contributed to the preservation of the cedar-wood tablets?",
    options: ["They were stored in airtight containers.", "The specific microclimate and the wood's resin.", "They were intentionally fire-hardened by their creators.", "The tablets were coated in a layer of protective wax."],
    correctAnswer: "B",
    explanation: "The passage states the tablets were 'preserved for millennia due to Byblos's unique coastal microclimate and the resinous nature of the wood.'"
  }
  // --- PASTE THE REST OF YOUR 16 QUESTIONS HERE ---
  // Ensure each question has:
  // - passageIndex (0 to N-1, corresponding to allPassages)
  // - type (one of the defined QuestionType literals)
  // - text (the question itself)
  // - options (an array of 4 strings)
  // - correctAnswer ('A', 'B', 'C', or 'D')
  // - explanation (a string explaining the answer)
];

    