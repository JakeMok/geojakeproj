//Set timing interval to global variable name.
var clock = setInterval("showtime()", 1000);
//Function to display current time on the page.
function showtime() {
  var now = new Date();
  var time = now.toLocaleTimeString();
  document.getElementById("ptime").innerHTML = time;
}

//Set timing interval to global variable name
var calendar = setInterval("showdate()");
//Set preferences for the way the date is displayed
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//Function to display the current date on the page
function showdate() {
  var day = new Date();
  var date = (day.toLocaleDateString(undefined, options));
  document.getElementById("pdate").innerHTML = date;
}


// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('list');
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')



// edit option
let editElement; 
let editFlag = false;
let editId = "";
// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem) //Gotta prevent is from submitting and going away
//clear items
clearBtn.addEventListener('click', clearItems)
window.addEventListener('DOMContentLoaded', setupItems)

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault(); //e would be the event of Evenlistener()????
    const value = grocery.value;
    const id = new Date().getTime().toString()
    if(value !== '' && editFlag == false){ //Add the item to a ist if not empty 
        createListItem(id, value)
        //Display Alert
        displayAlert('Item added to the list', 'success');
        //Show Container
        container.classList.add('show-container')
        //add to local storage
        addToLocalStorage(id, value);
        //Set back to default
        setBackToDefault()

    }
    else if(value != '' && editFlag == true){
        editElement.innerHTML = value //Value comes from the grocery-value
        displayAlert('Value Changed', 'success');
        //edit local storage
        editLocalStorage(editID, value)
        setBackToDefault()
    }
    else{
        displayAlert("Please Enter Value", "danger")


    }
}
//Display alert
function displayAlert(text, action){
    alert.textContent = text
    alert.classList.add(`alert-${action}`)
    //Remove Alert
    setTimeout(function(){
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 1000)
    

}

//set back to default
function setBackToDefault(){
    grocery.value = ''
    editFlag = false;
    editId = ''
    submitBtn.textContent = 'submit';
    
}
//clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item')
    if(items.length > 0 ){
        items.forEach(function(item){
            list.removeChild(item); //List is the parent and we are removing the child
        })
    }
    container.classList.remove("show-container")
    displayAlert('empty list', "danger");
    setBackToDefault();
    localStorage.removeItem('list')
} 

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement; //Look for button then go up two parents to remove from grocery list check html syntax on console to see more
    const id = element.dataset.id //FIGURE OUT WHAT THIS DOES I'M LOWKEY CONFUSED ON THIS BUT
    list.removeChild(element)
    if(list.children.length === 0 ){
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger')
    setBackToDefault();
    //Remove from local storage
    removeFromLocalStorage(id);


}
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement; //Access the grocery item
    //set edit Item
    editElement = e.currentTarget.parentElement.previousElementSibling; // Looking for title which is sibling to his b/c it is a dynamic thing also u are editing the text
    //set form Value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = {id: id, value: value};
    let items = getLocalStorage(); //If no then setup as an empty array 
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items))
}
function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    })
    localStorage.setItem('list', JSON.stringify(items))

}
function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}

// ****** SETUP ITEMS **********

function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        }
        return item;
    })

    //localStorage API --> Default into JS
    //localStorage.setItem('Orange', JSON.stringify(['item','item2'])) //Save it as a string
    //setItem
    //getItem
    //removeItem
    //save as strings
    localStorage.setItem('list', JSON.stringify(items))

}
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}
function createListItem(id,value){
    const element = document.createElement('article');
    //add class
    element.classList.add('grocery-item')
    //add ID
    const attr = document.createAttribute('data-id')
    attr.value = id 
    element.setAttributeNode(attr);
    element.innerHTML = `                      <p class = "title"> ${value} </p>
    <div class="btn-container">
        <button type = "button" class = "edit-btn">
            <i class = "fas fa-edit"></i>
        </button>
        <button type = "button" class = "delete-btn"> 
            <i class = "fas fa-trash"></i>
        </button>
    </div>`
    //edit funtion (has to be after the code because it'll be loaded in after not before)
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);


    //delete function 
    //Append Child
    list.appendChild(element);
}

quotes1 = [
    
  [
    '“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”',
    'by Albert Einstein (about)'
  ],
  [
    '“It is our choices, Harry, that show what we truly are, far more than our abilities.”',
    'by J.K. Rowling (about)'
  ],
  [
    '“There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.”',
    'by Albert Einstein (about)'
  ],
  [
    '“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”',
    'by Jane Austen (about)'
  ],
  [
    "“Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring.”",
    'by Marilyn Monroe (about)'
  ],
  [
    '“Try not to become a man of success. Rather become a man of value.”',
    'by Albert Einstein (about)'
  ],
  [
    '“It is better to be hated for what you are than to be loved for what you are not.”',
    'by André Gide (about)'
  ],
  [
    "“I have not failed. I've just found 10,000 ways that won't work.”",
    'by Thomas A. Edison (about)'
  ],
  [
    "“A woman is like a tea bag; you never know how strong it is until it's in hot water.”",
    'by Eleanor Roosevelt (about)'
  ],
  [
    '“A day without sunshine is like, you know, night.”',
    'by Steve Martin (about)'
  ]

]
quotes2 = 
[
  [
    "“This life is what you make it. No matter what, you're going to mess up sometimes, it's a universal truth. But the good part is you get to decide how you're going to mess it up. Girls will be your friends - they'll act like it anyway. But just remember, some come, some go. The ones that stay with you through everything - they're your true best friends. Don't let go of them. Also remember, sisters make the best friends in the world. As for lovers, well, they'll come and go too. And baby, I hate to say it, most of them - actually pretty much all of them are going to break your heart, but you can't give up because if you give up, you'll never find your soulmate. You'll never find that half who makes you whole and that goes for everything. Just because you fail once, doesn't mean you're gonna fail at everything. Keep trying, hold on, and always, always, always believe in yourself, because if you don't, then who will, sweetie? So keep your head high, keep your chin up, and most importantly, keep smiling, because life's a beautiful thing and there's so much to smile about.”",
    'by Marilyn Monroe (about)'
  ],
  [
    '“It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.”',
    'by J.K. Rowling (about)'
  ],
  [
    "“If you can't explain it to a six year old, you don't understand it yourself.”",
    'by Albert Einstein (about)'
  ],
  [
    "“You may not be her first, her last, or her only. She loved before she may love again. But if she loves you now, what else matters? She's not perfect—you aren't either, and the two of you may never be perfect together but if she can make you laugh, cause you to think twice, and admit to being human and making mistakes, hold onto her and give her the most you can. She may not be thinking about you every second of the day, but she will give you a part of her that she knows you can break—her heart. So don't hurt her, don't change her, don't analyze and don't expect more than she can give. Smile when she makes you happy, let her know when she makes you mad, and miss her when she's not there.”",
    'by Bob Marley (about)'
  ],
  [
    '“I like nonsense, it wakes up the brain cells. Fantasy is a necessary ingredient in living.”',
    'by Dr. Seuss (about)'
  ],
  [
    '“I may not have gone where I intended to go, but I think I have ended up where I needed to be.”',
    'by Douglas Adams (about)'
  ],
  [
    "“The opposite of love is not hate, it's indifference. The opposite of art is not ugliness, it's indifference. The opposite of faith is not heresy, it's indifference. And the opposite of life is not death, it's indifference.”",
    'by Elie Wiesel (about)'
  ],
  [
    '“It is not a lack of love, but a lack of friendship that makes unhappy marriages.”',
    'by Friedrich Nietzsche (about)'
  ],
  [
    '“Good friends, good books, and a sleepy conscience: this is the ideal life.”',
    'by Mark Twain (about)'
  ],
  [
    '“Life is what happens to us while we are making other plans.”',
    'by Allen Saunders (about)'
  ]
]
quotes3 = [

  [
    '“I love you without knowing how, or when, or from where. I love you simply, without problems or pride: I love you in this way because I do not know any other way of loving but this, in which there is no I or you, so intimate that your hand upon my chest is my hand, so intimate that when I fall asleep your eyes close.”',
    'by Pablo Neruda (about)'
  ],
  [
    '“For every minute you are angry you lose sixty seconds of happiness.”',
    'by Ralph Waldo Emerson (about)'
  ],
  [
    '“If you judge people, you have no time to love them.”',
    'by Mother Teresa (about)'
  ],
  [
    '“Anyone who thinks sitting in church can make you a Christian must also think that sitting in a garage can make you a car.”',
    'by Garrison Keillor (about)'
  ],
  [
    '“Beauty is in the eye of the beholder and it may be necessary from time to time to give a stupid or misinformed beholder a black eye.”',
    'by Jim Henson (about)'
  ],
  [
    '“Today you are You, that is truer than true. There is no one alive who is Youer than You.”',
    'by Dr. Seuss (about)'
  ],
  [
    '“If you want your children to be intelligent, read them fairy tales. If you want them to be more intelligent, read them more fairy tales.”',
    'by Albert Einstein (about)'
  ],
  [
    '“It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all - in which case, you fail by default.”',
    'by J.K. Rowling (about)'
  ],
  [
    '“Logic will get you from A to Z; imagination will get you everywhere.”',
    'by Albert Einstein (about)'
  ],
  [
    '“One good thing about music, when it hits you, you feel no pain.”',
    'by Bob Marley (about)'
  ]
]
quotes4 = [
    [
      "“The more that you read, the more things you will know. The more that you learn, the more places you'll go.”",
      'by Dr. Seuss (about)'
    ],
    [
      '“Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?”',
      'by J.K. Rowling (about)'
    ],
    [
      '“The truth is, everyone is going to hurt you. You just got to find the ones worth suffering for.”',
      'by Bob Marley (about)'
    ],
    [
      '“Not all of us can do great things. But we can do small things with great love.”',
      'by Mother Teresa (about)'
    ],
    [
      '“To the well-organized mind, death is but the next great adventure.”',
      'by J.K. Rowling (about)'
    ],
    [
      "“All you need is love. But a little chocolate now and then doesn't hurt.”",
      'by Charles M. Schulz (about)'
    ],
    [
      "“We read to know we're not alone.”",
      'by William Nicholson (about)'
    ],
    [
      '“Any fool can know. The point is to understand.”',
      'by Albert Einstein (about)'
    ],
    [
      '“I have always imagined that Paradise will be a kind of library.”',
      'by Jorge Luis Borges (about)'
    ],
    [
      '“It is never too late to be what you might have been.”',
      'by George Eliot (about)'
    ]
  ]
quotes5 = [
[
  '“A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one.”',
  'by George R.R. Martin (about)'
],
[
  '“You can never get a cup of tea large enough or a book long enough to suit me.”',
  'by C.S. Lewis (about)'
],
[
  '“You believe lies so you eventually learn to trust no one but yourself.”',
  'by Marilyn Monroe (about)'
],
[
  '“If you can make a woman laugh, you can make her do anything.”',
  'by Marilyn Monroe (about)'
],
[
  '“Life is like riding a bicycle. To keep your balance, you must keep moving.”',
  'by Albert Einstein (about)'
],
[
  '“The real lover is the man who can thrill you by kissing your forehead or smiling into your eyes or just staring into space.”',
  'by Marilyn Monroe (about)'
],
[
  "“A wise girl kisses but doesn't love, listens but doesn't believe, and leaves before she is left.”",
  'by Marilyn Monroe (about)'
],
[
  '“Only in the darkness can you see the stars.”',
  'by Martin Luther King Jr. (about)'
],
[
  '“It matters not what someone is born, but what they grow to be.”',
  'by J.K. Rowling (about)'
],
[
  '“Love does not begin and end the way we seem to think it does. Love is a battle, love is a war; love is a growing up.”',
  'by James Baldwin (about)'
]
]
quotes6 = [
[
  '“There is nothing I would not do for those who are really my friends. I have no notion of loving people by halves, it is not my nature.”',
  'by Jane Austen (about)'
],
[
  '“Do one thing every day that scares you.”',
  'by Eleanor Roosevelt (about)'
],
[
  '“I am good, but not an angel. I do sin, but I am not the devil. I am just a small girl in a big world trying to find someone to love.”',
  'by Marilyn Monroe (about)'
],
[
  '“If I were not a physicist, I would probably be a musician. I often think in music. I live my daydreams in music. I see my life in terms of music.”',
  'by Albert Einstein (about)'
],
[
  '“If you only read the books that everyone else is reading, you can only think what everyone else is thinking.”',
  'by Haruki Murakami (about)'
],
[
  '“The difference between genius and stupidity is: genius has its limits.”',
  'by Alexandre Dumas fils (about)'
],
[
  "“He's like a drug for you, Bella.”",
  'by Stephenie Meyer (about)'
],
[
  '“There is no friend as loyal as a book.”',
  'by Ernest Hemingway (about)'
],
[
  '“When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.”',
  'by Helen Keller (about)'
],
[
  "“Life isn't about finding yourself. Life is about creating yourself.”",
  'by George Bernard Shaw (about)'
]]
quotes7 = [
    [
      "“That's the problem with drinking, I thought, as I poured myself a drink. If something bad happens you drink in an attempt to forget; if something good happens you drink in order to celebrate; and if nothing happens you drink to make something happen.”",
      'by Charles Bukowski (about)'
    ],
    [
      '“You don’t forget the face of the person who was your last hope.”',
      'by Suzanne Collins (about)'
    ],
    [
      "“Remember, we're madly in love, so it's all right to kiss me anytime you feel like it.”",
      'by Suzanne Collins (about)'
    ],
    [
      '“To love at all is to be vulnerable. Love anything and your heart will be wrung and possibly broken. If you want to make sure of keeping it intact you must give it to no one, not even an animal. Wrap it carefully round with hobbies and little luxuries; avoid all entanglements. Lock it up safe in the casket or coffin of your selfishness. But in that casket, safe, dark, motionless, airless, it will change. It will not be broken; it will become unbreakable, impenetrable, irredeemable. To love is to be vulnerable.”',
      'by C.S. Lewis (about)'
    ],
    [
      '“Not all those who wander are lost.”',
      'by J.R.R. Tolkien (about)'
    ],
    [
      '“Do not pity the dead, Harry. Pity the living, and, above all those who live without love.”',
      'by J.K. Rowling (about)'
    ],
    [
      '“There is nothing to writing. All you do is sit down at a typewriter and bleed.”',
      'by Ernest Hemingway (about)'
    ],
    [
      '“Finish each day and be done with it. You have done what you could. Some blunders and absurdities no doubt crept in; forget them as soon as you can. Tomorrow is a new day. You shall begin it serenely and with too high a spirit to be encumbered with your old nonsense.”',
      'by Ralph Waldo Emerson (about)'
    ],
    [
      '“I have never let my schooling interfere with my education.”',
      'by Mark Twain (about)'
    ],
    [
      "“I have heard there are troubles of more than one kind. Some come from ahead and some come from behind. But I've bought a big bat. I'm all ready you see. Now my troubles are going to have troubles with me!”",
      'by Dr. Seuss (about)'
    ]
  ]
quotes8 = [
[
  '“If I had a flower for every time I thought of you...I could walk through my garden forever.”',
  'by Alfred Tennyson (about)'
],
[
  '“Some people never go crazy. What truly horrible lives they must lead.”',
  'by Charles Bukowski (about)'
],
[
  '“The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.”',
  'by Terry Pratchett (about)'
],
[
  '“Think left and think right and think low and think high. Oh, the thinks you can think up if only you try!”',
  'by Dr. Seuss (about)'
],
[
  "“What really knocks me out is a book that, when you're all done reading it, you wish the author that wrote it was a terrific friend of yours and you could call him up on the phone whenever you felt like it. That doesn't happen much, though.”",
  'by J.D. Salinger (about)'
],
[
  '“The reason I talk to myself is because I’m the only one whose answers I accept.”',
  'by George Carlin (about)'
],
[
  "“You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.”",
  'by John Lennon (about)'
],
[
  '“I am free of all prejudice. I hate everyone equally. ”',
  'by W.C. Fields (about)'
],
[
  "“The question isn't who is going to let me; it's who is going to stop me.”",
  'by Ayn Rand (about)'
],
[
  "“′Classic′ - a book which people praise and don't read.”",
  'by Mark Twain (about)'
]
]
quotes10 =   [
[
  '“Anyone who has never made a mistake has never tried anything new.”',
  'by Albert Einstein (about)'
],
[
  "“A lady's imagination is very rapid; it jumps from admiration to love, from love to matrimony in a moment.”",
  'by Jane Austen (about)'
],
[
  '“Remember, if the time should come when you have to make a choice between what is right and what is easy, remember what happened to a boy who was good, and kind, and brave, because he strayed across the path of Lord Voldemort. Remember Cedric Diggory.”',
  'by J.K. Rowling (about)'
],
[
  '“I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book! -- When I have a house of my own, I shall be miserable if I have not an excellent library.”',
  'by Jane Austen (about)'
],
[
  '“There are few people whom I really love, and still fewer of whom I think well. The more I see of the world, the more am I dissatisfied with it; and every day confirms my belief of the inconsistency of all human characters, and of the little dependence that can be placed on the appearance of merit or sense.”',
  'by Jane Austen (about)'
],
[
  '“Some day you will be old enough to start reading fairy tales again.”',
  'by C.S. Lewis (about)'
],
[
  '“We are not necessarily doubting that God will do the best for us; we are wondering how painful the best will turn out to be.”',
  'by C.S. Lewis (about)'
],
[
  '“The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.”',
  'by Mark Twain (about)'
],
[
  '“A lie can travel half way around the world while the truth is putting on its shoes.”',
  'by Mark Twain (about)'
],
[
  '“I believe in Christianity as I believe that the sun has risen: not only because I see it, but because by it I see everything else.”',
  'by C.S. Lewis (about)'
]
]
quotes9 =   [
[
  '“The truth." Dumbledore sighed. "It is a beautiful and terrible thing, and should therefore be treated with great caution.”',
  'by J.K. Rowling (about)'
],
[
  "“I'm the one that's got to die when it's time for me to die, so let me live my life the way I want to.”",
  'by Jimi Hendrix (about)'
],
[
  '“To die will be an awfully big adventure.”',
  'by J.M. Barrie (about)'
],
[
  '“It takes courage to grow up and become who you really are.”',
  'by E.E. Cummings (about)'
],
[
  '“But better to get hurt by the truth than comforted with a lie.”',
  'by Khaled Hosseini (about)'
],
[
  '“You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it.”',
  'by Harper Lee (about)'
],
[
  '“You have to write the book that wants to be written. And if the book will be too difficult for grown-ups, then you write it for children.”',
  "by Madeleine L'Engle (about)"
],
[
  '“Never tell the truth to people who are not worthy of it.”',
  'by Mark Twain (about)'
],
[
  "“A person's a person, no matter how small.”",
  'by Dr. Seuss (about)'
],
[
  '“... a mind needs books as a sword needs a whetstone, if it is to keep its edge.”',
  'by George R.R. Martin (about)'
]
]
function randomNumber(min, max) { 
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} 
let firstnum = randomNumber(0,9)
differentitems = [quotes1, quotes2, quotes3, quotes4, quotes5, quotes6, quotes7, quotes8,quotes9,quotes10]

quoteitem = differentitems[firstnum]
let secondnum = randomNumber(0,9)
let finalQuote = quoteitem[secondnum]
finalQuote = finalQuote.join(' ')

finalQuote = (finalQuote.substr(0, finalQuote.length - 7))

document.getElementById("pussy").innerHTML = `${finalQuote}`




