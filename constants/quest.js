// expor navigations

export const questions = [
  {
    questionNumber: 1,
    head: "Ceaser Cipher",
    question: "Decrypt the following message to pass through this level.",
    questionText: "Khoor zruog lv d phvvdjh",
    hint: "Caeser cipher is an addition cipher with some fixed key.",
    answerInstructions:
      "Enter the flag with all lowercase characters and without spaces.",
  },
  {
    questionNumber: 2,
    head: "DNS Dilemma",
    question: "Resolve the following domain name to IPv4 address to proceed.",
    questionText: "vit.edu.in",
    hint: "nslookup. You can also use online tools available on web.",
    answerInstructions: "Enter 0.0.0.0",
  },
  {
    questionNumber: 3,
    head: "Vigenère Cipher Encryption",
    question:
      "Encrypt the following message using vigenere cipher with key 'itsa' to get the flag.",
    questionText: "information",
    hint: "C = E (K, P) = (Pi + Ki) mod 26 \n where K is key P ia a Plaintext",
  },
  {
    questionNumber: 4,
    head: "Container Caper",
    question:
      "Find the readme.txt file in the docker container to get the flag.\nUse following url for downloading the tar file of docker image load it in your system and capture the flag.",
    questionText:
      "https://drive.google.com/file/d/1DKn18L5J7BNOpGpaBsZDNhv13vajzbVb/view?usp=sharing",
    hint: "Commands: docker load, exec, find, ls, cat, cd",
  },
  {
    questionNumber: 5,
    head: "Steganography",
    question:
      "Art of hiding data...\nDownload steghide in yor system and explore the following image\nRemember last level's flag to move forward",
    questionText:
      "https://drive.google.com/file/d/195nU7IGFNTuDdiCW0vryxrD-YsokPC3K/view?usp=sharing",
    hint: "Commands : steghide ,apt-get",
    answerInstructions: "Open the file embedded in image and enter the flag.",
  },
  {
    questionNumber: 6,
    head: "Sherlock",
    question:
      "Encourage the sherlock in your linux system to find the online presence of username : 'itsa.vit' on mapify.\nYou need to download sherlock in your linux System and find the url of itsa.vit on mapify portal using sherlock tool.",
    questionText: "Username:itsa.vit \t site:mapify",
    hint: "Commands : sherlock ,apt-get \nExplore different flags of sherlock.",
    answerInstructions:
      "Enter the url you get after running sherlock command for mapify site",
  },
  {
    questionNumber: 7,
    head: "SQL Injection",
    question:
      "Analyze the datasets of website locate the users table dump the hash and capture the flag.",
    questionText: "http://testphp.vulnweb.com/listproducts.php?cat=1",
    hint: "Commands : sqlmap ,apt-get\n8.",
    answerInstructions:
      "Enter the url you get after running sherlock command for mapify site",
  },
];
