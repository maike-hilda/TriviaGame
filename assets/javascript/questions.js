// question constructor
function Question(question, answers, correct, funFact, gifKeyword) {
    this.question = question; // string
    this.answers = answers; // array of strings
    this.correct = correct; // string
    this.funFact = funFact; // string
    this.gifKeyword = gifKeyword // string
}

// question array
let questions = [];

questions.push(new Question("What is You know who's middle name?", 
    ["Severus", "Horrace", "Tom", "Marvolo"], "Marvolo", 
    "Lord Voldemort's full name is Tom Marvolo Riddle, Tom after his muggle dad and Marvolo after his grandfather.",
    "Tom Riddle Voldemort"));

questions.push(new Question("What does the K in J.K. Rowling stand for?", 
    ["Kathrine", "Kathleen", "Katrina", "Kaley"], "Kathleen", 
    "Joanne Kathleen's last name is pronounced Row-ling, like rowing a boat.",
    "J.K. Rowling"));

questions.push(new Question("What is the name of Hermione and Ron's son?",
    ["Fred", "Albus", "Hugo", "Sirius"], "Hugo", 
    "Ron and Hermione have two children named Hugo and Rose.",
    "Ron Hermione Hugo"));

questions.push(new Question("Who is Neville Longbottom married to?",
    ["Hannah Abbott", "Luna Lovegood", "Lavender Brown", "Ginny Weasley"], "Hannah Abbott",
    "Neville Longbottom's  wife Hannah Abbott is landlady of the Leaky Cauldron, entrance to Diagon Alley in London.",
    "Neville Longbottom Hannah Abbott"));

questions.push(new Question("Which of the following items was not a horcrux?",
    ["Rowena Ravenclaw's Lost Diadem", "Godric Gryffindor's Sword", 
        "Salazar Slytherin's Locket", "Helga Hufflepuff's Cup"], "Godric Gryffindor's Sword",
    "Voldemort would have loved to collect all four founders objects, but he could never " +
        "find the sword as it only presents itself to a worthy Gryffindor.",
    "Slytherin's Sword"));

questions.push(new Question("What shape does Hermione's Patronus take?",
    ["Beaver", "Lynx", "Otter", "Doe"], "Otter",
    "Ron's patronus is a Jack Russell Terrier which are known to chase otters.",
    "Hermione Otter Patronus"));
