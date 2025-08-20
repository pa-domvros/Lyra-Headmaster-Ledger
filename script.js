document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const startButton = document.getElementById('start-button');
    const showCharactersButton = document.getElementById('show-characters-button');
    const nextCharacterButton = document.getElementById('next-character-button');
    const proceedButton = document.getElementById('proceed-button');
    const restartButton = document.getElementById('restart-button');
    
    const splashScreen = document.getElementById('splash-screen');
    const introScreen = document.getElementById('intro-screen');
    const characterIntroScreen = document.getElementById('character-intro-screen');
    const gameScreen = document.getElementById('game-screen');
    const mapScreen = document.getElementById('map-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    
    // Character intro screen elements
    const charIntroPortrait = document.getElementById('character-intro-portrait');
    const charIntroName = document.getElementById('character-intro-name');
    const charIntroDescription = document.getElementById('character-intro-description');
    
    // Game Over screen elements
    const gameOverTitle = document.getElementById('game-over-title');
    const winnerPortrait = document.getElementById('winner-portrait');
    const gameOverText = document.getElementById('game-over-text');
    
    // Other UI elements
    const scoreDisplay = document.getElementById('score');
    const levelTitle = document.getElementById('level-title');
    const progressBar = document.getElementById('progress-bar');
    const characterDialogue = document.getElementById('character-dialogue');
    const sentenceText = document.getElementById('sentence-text');
    const teamProgressList = document.getElementById('team-progress-list');

    // --- Game State Variables ---
    let totalScore = 0;
    let currentLevel = 0;
    let currentIntroIndex = 0;
    let questions = [];
    
    const teamData = {
        "Lyra's Department": { progress: 0, status: "Preparing lesson plans..." },
        "Dr. Reed's Research Group": { progress: 0, status: "Calibrating lab equipment." },
        "The Old Guard": { progress: 0, status: "Complaining in the staff room." },
        "Mr. Finch's Prefects": { progress: 0, status: "Enforcing hallway discipline." },
        "The Media Studies Duo": { progress: 0, status: "Trying to make a lesson go viral." }
    };

    // --- Character & Rival Intro Data (All Teachers) ---
    const introSequence = [
        { name: "Lyra's Department", character: "Lyra (Your Character)", desc: "As a forward-thinking English teacher, you believe the Headmaster's Ledger holds the key to innovative teaching methods that could inspire all students. You seek it for the good of the entire school.", portrait: "lyra_portrait.png" },
        { name: "Dr. Reed's Research Group", character: "Dr. Evelyn Reed", desc: "The ambitious Head of Science, Dr. Reed sees the Ledger's secrets as a means to secure a massive research grant and personal prestige. For her, education is a competitive field she intends to win.", portrait: "silas_portrait.png" },
        { name: "The Old Guard", character: "Unknown", desc: "A secret clique of cynical, tenured teachers who resist any change. They want to find and destroy the Ledger, believing its 'new ideas' will only create more work and undermine their authority.", portrait: "serpent_leader_portrait.png" },
        { name: "Mr. Finch's Prefects", character: "Mr. Alistair Finch", desc: "The strict Head of History, Mr. Finch believes only in traditional, rote-memorization teaching. He wants the Ledger to lock away its modern ideas and enforce his old-fashioned methods school-wide.", portrait: "finch_portrait.png" },
        { name: "The Media Studies Duo", character: "Mr. Davies & Ms. Gable", desc: "Two young, tech-savvy teachers obsessed with their 'Teach-Tok' channel. They see the Ledger as the ultimate prop for a viral video series about 'The Secrets of Teaching', caring more for clicks than curriculum.", portrait: "duo_portrait.png" }
    ];

    // --- LEVEL DATA (Secondary School B1-B2 VOCABULARY - British English) ---
    const level1_Data = [
        { sentence: "The head of the school who is in charge of everything is the ______.", correctAnswer: 'headteacher', choices: ['counsellor', 'headteacher', 'librarian'] },
        { sentence: "A subject you can choose based on your interests is called an ______.", correctAnswer: 'option', choices: ['option', 'required', 'assignment'] },
        { sentence: "All the pupils in a school are known as the ______.", correctAnswer: 'student body', choices: ['staff', 'student body', 'faculty'] },
        { sentence: "The teacher who can help you with your class timetable and personal problems is the ______.", correctAnswer: 'counsellor', choices: ['headteacher', 'counsellor', 'supervisor'] },
        { sentence: "We have an ______ in the main hall every Monday morning.", correctAnswer: 'assembly', choices: ['assembly', 'intermission', 'breaktime'] },
        { sentence: "Your daily list of classes and the times they meet is your ______.", correctAnswer: 'timetable', choices: ['timetable', 'curriculum', 'deadline'] },
        { sentence: "Your marks are officially recorded on your ______.", correctAnswer: 'school report', choices: ['school report', 'permission slip', 'yearbook'] },
        { sentence: "All of the teachers and adults who work at the school are the ______.", correctAnswer: 'staff', choices: ['staff', 'student body', 'classmates'] },
        { sentence: "The big room where the entire school can gather for events is the ______.", correctAnswer: 'main hall', choices: ['canteen', 'main hall', 'sports hall'] },
        { sentence: "A pupil who is chosen to help teachers and monitor other students is a ______.", correctAnswer: 'prefect', choices: ['bully', 'prefect', 'colleague'] }
    ];

    const level2_Data = [
        { sentence: "Your actions will have ______, so it's important to make good choices.", correctAnswer: 'consequences', choices: ['consequences', 'options', 'benefits'] },
        { sentence: "Talking loudly while others are trying to work is ______ behaviour.", correctAnswer: 'disruptive', choices: ['supportive', 'disruptive', 'cooperative'] },
        { sentence: "Copying someone else's work for an assignment is a form of ______.", correctAnswer: 'cheating', choices: ['researching', 'cheating', 'collaborating'] },
        { sentence: "It is important to be ______ and listen when your teachers are speaking.", correctAnswer: 'respectful', choices: ['respectful', 'talkative', 'creative'] },
        { sentence: "Writing on school desks or walls is an act of ______.", correctAnswer: 'vandalism', choices: ['art', 'vandalism', 'expression'] },
        { sentence: "Pupils who repeatedly misbehave may end up in ______ after school.", correctAnswer: 'detention', choices: ['a club', 'detention', 'the library'] },
        { sentence: "Using the internet to say mean things about another pupil is a form of ______.", correctAnswer: 'cyberbullying', choices: ['socialising', 'cyberbullying', 'networking'] },
        { sentence: "Pupils are expected to be ______ and hand in their homework on time.", correctAnswer: 'responsible', choices: ['popular', 'responsible', 'casual'] },
        { sentence: "The school's ______ states that pupils must wear the correct uniform.", correctAnswer: 'dress code', choices: ['motto', 'dress code', 'mascot'] },
        { sentence: "Intentionally making another pupil feel scared or upset is ______.", correctAnswer: 'intimidation', choices: ['persuasion', 'intimidation', 'motivation'] }
    ];
    
    const level3_Data = [
        { sentence: "The teacher gave the class a new writing ______ due next week.", correctAnswer: 'assignment', choices: ['assignment', 'holiday', 'distraction'] },
        { sentence: "The ______ for the science project is this Friday.", correctAnswer: 'deadline', choices: ['idea', 'deadline', 'introduction'] },
        { sentence: "The school year is divided into three parts, each called a ______.", correctAnswer: 'term', choices: ['term', 'chapter', 'decade'] },
        { sentence: "Joining the chess club is a popular ______ activity.", correctAnswer: 'extracurricular', choices: ['academic', 'extracurricular', 'compulsory'] },
        { sentence: "Your final ______ is based on your test scores and homework.", correctAnswer: 'mark', choices: ['opinion', 'mark', 'status'] },
        { sentence: "For the history exam, we have to give a ______ to the class.", correctAnswer: 'presentation', choices: ['presentation', 'performance', 'party'] },
        { sentence: "It's a good idea to ______ your work before you hand it in.", correctAnswer: 'proofread', choices: ['ignore', 'proofread', 'discard'] },
        { sentence: "The big tests at the end of the school year are called ______.", correctAnswer: 'end-of-year exams', choices: ['quizzes', 'end-of-year exams', 'spot tests'] },
        { sentence: "This group ______ requires everyone to contribute their ideas.", correctAnswer: 'project', choices: ['project', 'test', 'lecture'] },
        { sentence: "You must ______ your essay through the school's online portal.", correctAnswer: 'submit', choices: ['print', 'submit', 'delete'] }
    ];

    const level4_Data = [
        { sentence: "Working well with others in a group is called ______.", correctAnswer: 'collaboration', choices: ['collaboration', 'competition', 'isolation'] },
        { sentence: "Before writing your essay, you need to ______ the topic online and in books.", correctAnswer: 'research', choices: ['invent', 'research', 'guess'] },
        { sentence: "A good pupil will ______ the text closely to understand its deeper meaning.", correctAnswer: 'analyse', choices: ['analyse', 'skim', 'reread'] },
        { sentence: "It is important to ______ in class discussions by sharing your ideas.", correctAnswer: 'participate', choices: ['observe', 'participate', 'interrupt'] },
        { sentence: "Having good ______ means planning your time for homework and studying.", correctAnswer: 'study habits', choices: ['friend groups', 'study habits', 'hobbies'] },
        { sentence: "The teacher asked us to ______ the meaning of the poem.", correctAnswer: 'interpret', choices: ['interpret', 'memorise', 'copy'] },
        { sentence: "Solving problems requires ______ and looking at things in a new way.", correctAnswer: 'critical thinking', choices: ['daydreaming', 'critical thinking', 'following directions'] },
        { sentence: "Taking good notes is an ______ way to prepare for a test.", correctAnswer: 'effective', choices: ['ineffective', 'effective', 'optional'] },
        { sentence: "The ability to clearly ______ your ideas is a very important skill.", correctAnswer: 'communicate', choices: ['hide', 'communicate', 'confuse'] },
        { sentence: "She was able to ______ her argument with strong evidence from the book.", correctAnswer: 'support', choices: ['support', 'weaken', 'change'] }
    ];

    const level5_Data = [
        { sentence: "The ______ sets the rules for what pupils can and cannot wear.", correctAnswer: 'dress code', choices: ['timetable', 'dress code', 'deadline'] },
        { sentence: "You need to show good sportsmanship in all ______ activities.", correctAnswer: 'extracurricular', choices: ['extracurricular', 'academic', 'classroom'] },
        { sentence: "There are serious ______ for cheating on a test.", correctAnswer: 'consequences', choices: ['rewards', 'consequences', 'reasons'] },
        { sentence: "A key part of the group project is successful ______ with your partners.", correctAnswer: 'collaboration', choices: ['collaboration', 'instruction', 'separation'] },
        { sentence: "The ______ will see you now about your behaviour in class.", correctAnswer: 'headteacher', choices: ['headteacher', 'prefect', 'pupil'] },
        { sentence: "You must ______ and analyse the data before drawing a conclusion.", correctAnswer: 'interpret', choices: ['ignore', 'interpret', 'invent'] },
        { sentence: "Please ______ all assignments before the deadline.", correctAnswer: 'submit', choices: ['start', 'submit', 'review'] },
        { sentence: "Being ______ to your classmates and teachers is expected.", correctAnswer: 'respectful', choices: ['disruptive', 'respectful', 'similar'] },
        { sentence: "My favourite ______ subject is Art because I love to be creative.", correctAnswer: 'option', choices: ['option', 'core', 'required'] },
        { sentence: "Developing good ______ will help you succeed in your GCSEs.", correctAnswer: 'study habits', choices: ['rumours', 'study habits', 'excuses'] }
    ];
    
    const levels = {
        1: { title: "The Main Office: People and Places", data: level1_Data },
        2: { title: "The Counsellor's Office: Rules & Behaviour", data: level2_Data },
        3: { title: "The Classroom: Assignments & Marks", data: level3_Data },
        4: { title: "The Library: Skills for Success", data: level4_Data },
        5: { title: "The Final Assembly: End-of-Year Review", data: level5_Data }
    };

    // --- Event Listeners ---
    startButton.addEventListener('click', () => { splashScreen.classList.remove('active'); introScreen.classList.add('active'); });
    
    showCharactersButton.addEventListener('click', () => {
        introScreen.classList.remove('active');
        currentIntroIndex = 0;
        showCharacter(currentIntroIndex);
    });

    nextCharacterButton.addEventListener('click', () => {
        currentIntroIndex++;
        if (currentIntroIndex < introSequence.length) {
            showCharacter(currentIntroIndex);
        } else {
            characterIntroScreen.classList.remove('active');
            startLevel(1);
        }
    });

    proceedButton.addEventListener('click', () => {
        const nextLevel = currentLevel + 1;
        if (levels[nextLevel]) {
            startLevel(nextLevel);
        } else {
            triggerGameOver(introSequence[0], true);
        }
    });

    restartButton.addEventListener('click', () => {
        location.reload();
    });

    // --- Main Functions ---
    function showCharacter(index) {
        const character = introSequence[index];
        charIntroPortrait.src = character.portrait;
        charIntroName.textContent = character.name;
        charIntroDescription.textContent = character.desc;

        if (index === introSequence.length - 1) {
            nextCharacterButton.textContent = "Begin the School Year!";
        } else {
            nextCharacterButton.textContent = "Next";
        }
        characterIntroScreen.classList.add('active');
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startLevel(levelNumber) {
        currentLevel = levelNumber;
        const levelData = levels[currentLevel];
        if (!levelData) return;
        
        levelTitle.textContent = levelData.title;
        let levelScore = 0;
        let currentQuestionIndex = 0;
        questions = [...levelData.data];
        shuffleArray(questions);
        
        updateScoreDisplay(levelScore);
        updateProgressBar(0, questions.length);
        const choicesContainer = document.getElementById('choices-container');
        if (!choicesContainer.hasChildNodes()) {
            choicesContainer.innerHTML = `<button class="choice-button"></button><button class="choice-button"></button><button class="choice-button"></button>`;
        }
        
        [splashScreen, introScreen, characterIntroScreen, mapScreen, gameOverScreen].forEach(s => s.classList.remove('active'));
        gameScreen.classList.add('active');

        function displayQuestion() {
            if (currentQuestionIndex >= questions.length) {
                endLevel(levelScore);
                return;
            }
            const q = questions[currentQuestionIndex];
            sentenceText.innerHTML = q.sentence.replace('______', '<span class="blank"></span>');
            characterDialogue.textContent = "Let's see... Which word fits best here?";
            const buttons = document.querySelectorAll('.choice-button');
            buttons.forEach(b => { b.className = 'choice-button'; b.disabled = false; });
            let choices = [...q.choices];
            shuffleArray(choices);
            buttons.forEach((b, i) => { b.textContent = choices[i]; b.onclick = () => handleChoice(choices[i]); });
        }

        function handleChoice(selected) {
            const buttons = document.querySelectorAll('.choice-button');
            buttons.forEach(b => b.disabled = true);
            const correct = questions[currentQuestionIndex].correctAnswer;
            if (selected === correct) {
                levelScore += 10;
                characterDialogue.textContent = "Correct! That's the one.";
            } else {
                characterDialogue.textContent = `Not quite. The correct word was '${correct}'.`;
            }
            updateScoreDisplay(levelScore);
            buttons.forEach(b => {
                if (b.textContent === correct) b.classList.add('correct');
                else if (b.textContent === selected) b.classList.add('incorrect');
            });
            currentQuestionIndex++;
            updateProgressBar(currentQuestionIndex, questions.length);
            setTimeout(displayQuestion, 2000);
        }
        
        displayQuestion();
    }

    function updateScoreDisplay(score) { scoreDisplay.textContent = `Score: ${score}`; }

    function updateProgressBar(current, total) { progressBar.style.width = `${total > 0 ? (current / total) * 100 : 0}%`; }
    
    function endLevel(levelScore) {
        totalScore += levelScore;
        characterDialogue.textContent = `Trial passed! Our total score is ${totalScore}. Well done!`;
        sentenceText.innerHTML = `You have successfully passed the trial of the ${levels[currentLevel].title}!`;
        document.getElementById('choices-container').innerHTML = '';
        setTimeout(showMapScreen, 2500);
    }
    
    function showMapScreen() {
        teamData["Lyra's Department"].progress = currentLevel;
        teamData["Lyra's Department"].status = `Passed ${levels[currentLevel].title}! Total Score: ${totalScore}.`;
        
        let topRivalName = null;
        let maxProgress = 0;
        
        for (const teamName in teamData) {
            if (teamName !== "Lyra's Department") {
                if (Math.random() > 0.3) {
                    if (teamData[teamName].progress < currentLevel) teamData[teamName].progress++;
                }
                teamData[teamName].status = `Has passed Trial ${teamData[teamName].progress}.`;
            }
            if (teamData[teamName].progress > maxProgress) {
                maxProgress = teamData[teamName].progress;
                topRivalName = teamName;
            }
        }
        
        teamProgressList.innerHTML = '';
        for (const team in teamData) {
            const li = document.createElement('li');
            li.textContent = `${team}: ${teamData[team].status}`;
            if (team === "Lyra's Department") li.classList.add('player');
            teamProgressList.appendChild(li);
        }
        
        if (maxProgress > teamData["Lyra's Department"].progress) {
            const winnerData = introSequence.find(char => char.name === topRivalName);
            setTimeout(() => triggerGameOver(winnerData, false), 1000);
            return;
        }
        
        gameScreen.classList.remove('active');
        mapScreen.classList.add('active');
    }

    function triggerGameOver(winner, isPlayer) {
        if (isPlayer) {
            gameOverTitle.textContent = "The Ledger is Yours!";
            gameOverText.textContent = `Congratulations! You outsmarted your rivals and were the first to find the Headmaster's Ledger. Its wisdom can now help the whole school. Your final score is ${totalScore}!`;
            document.querySelector('.game-over-content').style.borderColor = '#6a9c89';
            document.getElementById('game-over-title').style.color = '#6a9c89';
        } else {
            gameOverTitle.textContent = "The Race is Lost";
            gameOverText.textContent = `While you were planning your lesson, ${winner.name} got ahead of you and has claimed the Ledger! Their goals may shape the future of the school... for better or worse.`;
        }
        winnerPortrait.src = winner.portrait;
        
        [gameScreen, mapScreen].forEach(s => s.classList.remove('active'));
        gameOverScreen.classList.add('active');
    }
});