
4:33
Introduction to programming with python
4:45
[Music]
5:02
all right this is cs50's Introduction to programming with python my name is David men and this is our week on functions
5:09
and variables but odds are many of you most of you have never actually programmed before so let's start by
5:14
doing just that let me go ahead here and open up my computer and on it a program called Visual Studio code or VSS code
5:21
which is just a very popular program nowadays for actually writing code now you don't have to write code using this
5:27
particular tool in fact all we need at the end of the day is is a a so-called text editor a program for writing text
5:33
and Heck if you really want you could even use something like Google Docs or Microsoft Word you'd have to save it in
5:38
the right format but really at the end of the day all you need is a program for writing text because that's what code is
5:43
text now within this particular program I'm going to have the ability to create one or more files via this top portion
5:49
of the screen and I'm going to do so by diving right in and doing this at the bottom of my screen at the bottom of my
5:55
screen is a so-called terminal window and this is a command line interface or CLI interface to the underlying computer
6:03
be it your Mac or your PC or even some server in the cloud and what I'm going to do here is literally write code and
6:10
then the name of the file that I want to code for instance hello.py as we'll soon see any program
6:16
that you write in Python generally has a file name that ends inp to indicate to the computer that it's indeed a program
6:22
written in Python now you'll see here at the top of my screen I have a blinking cursor a line one which is where the
6:28
very first line of my code is going to and then just a tab that reminds me of the name of this file hello.py and
6:34
without even knowing much python I'm going to write my very first program here as follows print open parenthesis
6:41
quote hello comma World close quote and close parenthesis and you'll see that at
6:47
my keyboard some of my thoughts were finished for me I only had to type one parenthesis and the other one automatically appeared and that's just a
6:53
feature that we'll see of tools like this tool here now even if you've never programmed before odds already you can
7:00
guess infer what this simple program is going to do and it's only one line print
7:05
open parenthesis quote Hello World close quote close parenthesis indeed when I
7:10
run this program ultimately it's just going to say hello to the world and in fact this is a very famous perhaps the
7:15
most canonical program that you can write as your very first program in Python or any other language and so that's what I've done here but on my Mac
7:23
my PC even my phone I'm generally in the habit like you of running programs by double clicking an icon or just tapping
7:29
on the screen but I see no such icons here and in fact that's because my interface to at least my current Mac or
7:36
PC or some server in the cloud is again only a CLI command line interface which even though it might feel like it's a
7:43
step back from the menus and buttons and icons that you and I take for granted every day you'll find we think that it's
7:48
ultimately a much more powerful interface and Incredibly popular to use among programmers in the real world so
7:55
to run this program I'm going to have to use a command and I'm going to move my cursor back down to the bottom of the
8:00
screen here where previously I already ran one command the command code which has the effect of opening vs code in my
8:07
computer and then I passed in the name of the file that I wanted to code up now I have a chance to type a second command
8:13
and you'll see I see a second dollar sign now the dollar sign here doesn't indicate any kind of currency or money
8:19
it just is the symbol that's generally used to indicate your prompt where the command line interface wants you to put
8:25
those commands now the command I can run here is going to be this I'm going to run python of
8:32
hello.py now why is that well it turns out that when I actually write code in a language like python it's of course
8:39
stored in that file hello.py but I need to interpret the code top to bottom left
8:45
to right so that the computer knows what to do indeed at the end of the day even if you don't really know much about computers you've probably heard that
8:51
computers only understand zeros and one the so-called binary system well if that's the case then something that says
8:58
print and parenthe is and quote unquote hello world is not surely zeros and ones
9:03
we have to somehow translate it into the zeros and ones that the computer understands now fortunately so long as
9:08
you've installed such a program in advance there's a program as well as a language called python so python is not
9:15
only a language in which we're going to write code it's also a program Otherwise Known As an interpreter that you install
9:21
for free on your own Mac or PC or some server in the cloud and you can then run that program that interpreter passing to
9:28
it as input the name of your file like mine here hello.py and then that program that interpreter will handle the process
9:34
of reading it top to bottom left to right and translating it effectively into those zeros and ones that the
9:40
computer can understand so let's do just that let me go back to vs code here I already typed out python of hello.py but
9:47
I didn't get hit enter and that's what's now going to kick off this command and hopefully if I didn't mess any of this
9:53
up I should see my very first program's output to the screen and voila hello
10:00
world so if you two have typed exactly that same code and have executed exactly that same command you will have written
10:07
your very first program in this case in Python well now let's take a step back and consider what is it that we actually
10:14
just did and what is it we're looking here on the screen well first and foremost in most any programming language you tend to have access to what
10:20
are called functions a function is like an action or a verb that lets you do something in the program and generally
10:27
speaking any language comes with some predetermined set of functions some very basic actions or verbs that the computer
10:34
will already know how to do for you that the language really will know how to do for you and you the programmer the human
10:40
can use those functions at will to get the computer to do those things now the program in question here hello.py is
10:48
using one function and you can perhaps guess what it is that function is of course going to be this function print
10:55
and that print function of course doesn't print some pre-ordained string of text that is to say it prints
11:02
whatever it is you want it to print and here too do we have another piece of terminology in the world of programming
11:08
namely arguments an argument is an input to a function that somehow influences
11:14
Its Behavior the people who invented python of course didn't necessarily know what it is you and I are going to want
11:19
to print to the screen so they designed this print function using these parentheses with the ability to take as
11:25
input some string of text be it in English or any other human language that is what you want this function
11:31
ultimately to print onto the screen and what is it that the program's ultimately doing on the screen well it's printing
11:38
of course it's showing us hello world on the screen and that's generally in programming known as a side effect it
11:43
can be visual it can be audio in this case it's something that appears on the screen and functions therefore can
11:48
indeed have these side effects one of the things they can do as this verb or action is to display on the screen as a
11:54
side effect something like those World words that we wanted hello world
11:59
so that's my first program and you know I'm feeling pretty good everything worked as planned I didn't make any
12:05
mistakes but honestly when you're learning how to program and even once you've learned how to program years later you're going to make mistakes and
12:12
those mistakes of course are refer to a term you might already know which is that of a bug a bug is a mistake in a
12:18
program and they can take so many forms and take comfort perhaps in knowing that over the coming weeks you're going to
12:24
make so many mistakes you're going to have so many bugs in your code just like I did and just as I still do and those
12:31
bugs themselves are just mistakes that are problems for you to solve and over the weeks to come we're going to give
12:37
you a lot of tools both mental and Technical via which you can solve those problems but just don't get discouraged
12:43
if when writing your program for the first time it doesn't even work that first time it will with time with
12:49
practice and with experience so let me deliberately now make a mistake that there was a nonzero chance I might have
12:55
done accidentally already but I got lucky let me go ahead and just suppose I forgot to include something like the
13:01
closing parenthesis at the end of this line of code you know the code is almost correct it's like 99% of the way there
13:08
but now that I've pointed it out it's pretty obvious that it's missing that closed parenthesis but even little
13:14
seemingly Minor Details like that that you and I as humans wouldn't really care about and if you're sending an email or
13:19
a text message oh whatever it's just a typo it's not that big a deal it is going to be a big deal to the computer a
13:25
computer is going to take you literally and if you don't finish your thought in the the way the language expects it's
13:31
not going to necessarily run at all so let's do this I'm going to go ahead here and clear my screen down at the bottom
13:36
just so I can start fresh and I'm going to go ahead and run this version of my program after having made that change by
13:43
deleting the parenthesis I'm going to go ahead and type python again of hello.py and this time when I hit enter
13:49
I'm hoping I'm going to see hello world but here we have an error on the screen a so-called syntax error which refers to
13:57
my having made a mistake at my keyboard and it this one fortunately is pretty straightforward it indeed says that this
14:03
open parenthesis was never closed and so that's probably pretty intuitive now
14:09
what I need to do I need of course to close it unfortunately sometimes the error messages we'll see in the coming weeks are not going to be nearly that
14:15
userfriendly but there too again with experience with practice will you get better at debugging such programs let me
14:22
now make sure that I indeed fixed it correctly let me go ahead run now hello.py and hit enter and voila we're
14:28
back in business well let me pause here and see if we have any questions now about python itself writing or running
14:36
even the simplest of these programs uh could I write code inside a
14:42
word or for example Microsoft Excel and what's the barrier to doing that a
14:48
really good question and allow me to very explicitly say to the entire internet that you should not write code
14:54
with Microsoft Word I mention that only because it's a tool via which you can write text and code is at the end of the
15:00
day just text but it's not the right tool for the job we don't need bold facing underlining paragraphs and the
15:05
like we generally want something much simpler than Microsoft Word or Google Docs and so VSS code is an example of
15:11
just a more general purpose text editor its purpose in life is to allow you the human to edit text nowadays these text
15:18
editors come with many more features in fact you'll notice that even in my code here even though it's just one line
15:24
there's a bit of color to it the word print for me is appearing in blue the parentheses are black and we'll see as
15:29
we might write more lines of code more and more of the lines will come to life in various colors now that's just one
15:35
feature of a text editor we'll see too that it has features like this built-in terminal window it's going to have a built-in tool for debugging or finding
15:42
problems with code and it's just a very popular tool nowadays but there are many many others out there you're welcome to
15:48
use them for this course and Beyond we just happen to use this one in large part too because you can also use vs
15:53
code nowadays uh for free in the cloud how about one other question here on programming with python or hello world
16:01
or syntax more generally I was trying to ask if is not possible to run the code
16:07
without using the terminal window I think I heard is it not if it's possible to run the program without the terminal
16:14
window are you yes sir okay you froze for me again but let me infer what the question is so in this environment as
16:21
I've configured my computer I can only run these python programs via the terminal window now that's good for me
16:27
the programmer or the person who's trying to learn how to program but it's not very good if you want to ship this
16:32
software and have other people use your actual code you can absolutely write programs and then allow other people to
16:39
use not a command line interface but a graphical user interface or guey GUI this is just one mechanism and perhaps I
16:46
think the the best one with which to start writing code because eventually it's going to give us a lot more control
16:52
allow me to forge ahead here but please feel free to continue asking questions along the way if only via the chat let's
16:58
consider now how we might go about improving this program let's go about improving this program to make it a
17:03
little more interactive and not just assume that everyone is going to want to be greeted more generically as hello
17:09
world let's see if I can't get this program to say something like hello David or hello Jeremiah or hello Horatio
17:15
or whatever the actual user's name is well to do this I'm going to go back up to hello.py and I'm going to add another
17:22
line of code at the very top that simply says for instance uh what's your name
17:28
quote unquote with an extra space at the end so I'm printing to the user asking them a question for some input but now I
17:33
need another function to actually get input from the user and perfectly enough python comes with a function named input
17:40
so here I'm going to go ahead and call a function input open pen close pen and
17:45
that's going to prompt the user with just a blinking cursor waiting for them to type something in now it turns out if
17:51
I read the documentation for the input function it actually takes an argument itself I don't need to use print
17:57
separately and then promp the user for input so I can actually simplify this code before we even use it I'm going to
18:03
go ahead here and take that same string from print put it as an argument to the input function and get rid of the print
18:09
alt together and in fact that print would have added a new line anyway so now I've just got a prompt where the user's cursor is going to end up
18:15
blinking at the end of the line asking them what's your name in my terminal window I'm going to run python of
18:22
hello.py enter okay we're making progress it seems that this new function input is indeed prompting me the human
18:29
for input so I'm going to type in my name David and hit enter unfortunately it doesn't really do anything with my
18:35
name it just outputs it immediately all right well I could fix this right I could go up to line two and I could
18:41
change world to David and then back in my terminal window here I can do python
18:46
of hello.py enter what's your name David enter and there we go all right now I'm
18:51
up and running now my program is working as intended of course this isn't really
18:57
working as intend Ed here let me go ahead and try pretending to be my colleague Carter here well Carter's name
19:03
is this I'm going to go ahead and hit enter and I'll see of course hello Carter well obviously not because I've
19:08
hardcoded so to speak I've written literally my name inside of the string so we need some way now of actually
19:15
getting back what the user's input is and doing something with It ultimately and for this we're going to leverage
19:20
another feature of programming specifically a feature of some functions which is that they can have return
19:26
values as well if you think of input as being again this action this verb you can actually personify it as maybe a
19:33
person like a friend of yours that you've asked a question of and you've asked your friend to go get input from someone else go ask that person their
19:39
name and if your friend comes back knowing that person's name well wouldn't it be nice if they handed that name back
19:46
to you that's kind of what we need metaphorically the function to do is get the user's input and then hand it back to me so that I the programmer can do
19:53
something with it but if it's going to be handed back to me I kind of want to put it somewhere so that I can then
20:00
print it back on the screen I need to do the equivalent of take out like a piece of paper or a Post-It note write down on
20:06
this piece of paper what it is the human has said so that I can then feed it into as input that print function and to do
20:13
that we're going to need one more feature of programming namely variables and odds are most everyone's familiar
20:18
with variables from math class way back when X and Y and Z and the like well programming has that same capability
20:25
this ability to create a variable in this case in the computer's memory not just on a piece of paper and that
20:31
variable can store a value a number some text even an image or video or more a
20:37
variable is just a container for some variable a variable is just a container for some value inside of a computer or
20:44
inside of your own program so how do I go about expressing myself in this way well I think what I'm going to do is
20:50
introduce a variable that's a little more interestingly named than x or y i i could just say this x equals input but
20:58
I'm going to use a better name than a typical mathematical variable here and I'm going to literally call my variable
21:03
name why well in programming because I have a whole keyboard in front of me I can use more descriptive terms to
21:08
describe what it is I'm writing and now though there's an opportunity to consider a specific piece of syntax
21:14
we've seen parentheses we've seen quotes all of which are necessary when passing inputs to a function but this equal sign
21:22
here that's in between input on the right and name on the left is actually
21:27
important and it's technically not an equal sign per se it doesn't mean equality as much as it means assignment
21:34
so in Python and many programming languages a single equal sign is the assignment operator and what that means
21:40
specifically is that you want to assign from right to left whatever the user's
21:45
input is so the equal sign copies from the right to the left whatever the
21:52
return value of the function on the right is so again the input function clearly gets input from the user that's
21:58
why I was able to type my name or Carter's but it also sort of behind the scenes hands that value that return
22:06
value back to me the programmer and if I use an equal sign in a variable no matter what I call it I can store that
22:13
input in that variable so is to reuse it later so now sitting in the computer's memory somewhere is a container
22:19
containing David quote unquote or Carter quote unquote or whatever the human has typed in but here it's easy to make a
22:26
mistake suppose I decide to try to print that name and so I I kind of on a hunch
22:33
type in this hello comma name just kind of plugging in the name of the variable well let me go ahead here and run python
22:40
of hello.py and hit enter that's going to prompt me for my name and let me type in
22:45
my name daid but I haven't hit enter yet and perhaps via the chat what's going to happen here when I now hit enter I'm
22:53
hoping it says hello David I'd be okay if it says hello world but I don't want
22:59
it to say what it's actually G to say and yep what we're seeing in the chat is well it's probably going to say
23:04
literally hello comma name so that's not quite right so we need another way of
23:09
printing out the value inside of that variable rather than just this word name
23:15
well let me try this in a couple of different ways let me try this as follows let me go ahead and maybe undo
23:20
this because I've gotten pretty good already at saying hello so let's let you know let's draw that Line in the Sand and just say all right let's get at
23:26
least get hello comma out the door let's now print name and just on a hunch I'm going to try this I'm going to use print
23:32
again because you can use these functions as many times as you need and I'm going to pass to the name to the
23:38
print function the variable called name but notice I'm being a little clever now I'm not putting it in double quotes
23:44
because we've seen already that double quotes means literally print out n m I'm getting rid of the quotes this time in
23:50
hopes that now by passing the variable called name to the function called print
23:56
it will in fact go about printing printing the contents of that variable that is its so-called value all right
24:03
let's go ahead and do this here python of hello.py enter what's your name David
24:08
and now crossing my finger still I see hello comma David all right so it's not
24:14
the best program I'm I'm kind of cutting some Corners here so to speak I'm saying hello David on two separate lines so
24:22
it's not as elegant it's not as pretty it's not as grammatically appropriate in English as just saying it all in one
24:27
breath on one line but at least I've solved the problem just not very well yet but let me take a step back now and
24:33
perhaps introduce a couple of other concepts with which we should be familiar which is as our programs get longer and they're no longer just one
24:40
line or two or even three eventually our programs are going to become dozens of lines maybe even hundreds of lines long
24:47
let's set the stage for Success moving forward it turns out that python and a lot of programming languages also
24:53
support something called comments comments are notes to yourself in your
24:58
code and you include comments by way of a special symbol in Python it's going to be the hash symbol typically and that
25:04
allows you to write the equivalent of a note to yourself but in a way that's not going to break your code the computer
25:09
actually ignores your comments it's just there for you it's just there for your teacher it's just there for your
25:14
colleague with whom you're sharing ultimately that code so if I go back to VSS code here and I just want to add
25:20
some comments to this program to explain to my teacher to myself to my colleagues
25:25
what this program is doing well let's go ahead and do that I'm going to go at the very top of my program and on line one
25:32
now I'm going to move that original line of code down a bit I'm going to add a hash and I'm going to say something like
25:37
this uh ask user for their name now I don't have to use that language I don't
25:43
have to use that uh that text I could use any human language whatsoever it doesn't have to be English but I'm going
25:49
to now below that just say something like this say hello to user and you'll
25:54
notice that vs code by default is kind of graying out my comments they're no longer blue there's no red there's no color in them and that's just because
26:00
they're notes to myself and the computer ultimately is going to ignore them but what we have now is two comments ask
26:07
user for their name and then a second comment say hello to user and I've just kind of commented each chunk of code
26:13
like each line or lines plural of code that are doing something noteworthy why
26:18
well tomorrow morning when I wake up having you know uh uh slept for quite some time forgotten what it is I did the
26:25
previous day it's convenient with comments to just see in English or your own human language what it is this
26:31
program is doing so that you don't have to read the code itself and better yet if there's maybe a mistake down the road
26:37
you can read what your intention was and then you can look at the code and figure out if your codee's now doing what you
26:43
intended so this isn't really necessary for a program this small it's pretty obvious with just one or two or three
26:49
lines what the program is doing it's just as fast to read the code than the comments but getting into this habit is generally a good thing to comment your
26:55
code every one or few lines so is to remind yourself and others what it is your intent and your code is doing
27:02
what's nice about comments too is this comments can also serve to be sort of a to-do list for yourself there's this
27:09
notion in uh programming of pseudo code pseudo code isn't a formal thing it's not one specific language it's just
27:15
using English or your own human language to express your thoughts succinctly methodically algorithmically so to speak
27:23
but pseudo code therefore because it's not Python and it's not necessarily English it just kind of allows you to
27:29
outline your program even in advance so for instance if I wasn't sure today how
27:34
I wanted to go about writing this program but I did know what I want to do I could have started today by just
27:40
writing this in hello.py no code I could have written just a couple of comments
27:45
to myself step one ask user for their name step two say hello to user then once I've outlined my program in pseudo
27:52
code then I can go in there and say all right how do I ask the user for their name uh well I can do input quote
27:57
unquote what what's your name question mark and then on the left here I can maybe put a variable and assign it to
28:03
that okay how do I say hello to the user well I know I can use print to say things on the screen let me say hello
28:09
comma uh and let me okay let me now print the person's name so again pseudo code is a nice way of structuring your
28:15
to-do list especially if you have no idea how to write the code because it breaks a bigger program down into small
28:23
bite-size tasks all right let me pause here to see if there are now any questions on comments pseudo code return
28:30
values or variables any questions we can clear up
28:36
here yeah my question is uh does the function input uh work for any type of
28:42
of information or only for Words yeah really good question so according to its
28:47
documentation and we'll look more at formal documentation soon input is going to expect what's called a string that is
28:53
a sequence of text be it in English or any other human language but it's indeed going to be expecting text with which to
28:59
prompt the user a good question how about another question from the group if we could I wanted to ask how I make
29:07
several line comment oh how do you do many lines of comments if if I'm hearing you correctly sure uh you would just
29:14
keep doing them like this you just prefix each of the lines with a hash symbol like I'm doing here there is
29:21
another technique for doing multi-line comments in Python that actually tend to have special meaning you can do three
29:27
double quotes like this and then anything in between here is a comment
29:33
that's another technique or you can use single quotes as well but more on those I think another time all right well if
29:39
you don't mind let me Forge ahead here and see how we might improve this program further and also introduce a few
29:44
other features that we might want to take into account over time so it turns out that we can certainly improve on
29:50
this program because it's a little disappointing that I'm cutting this corner and saying hello comma and then
29:56
on a new line print out name like we can do better and most programs you use on your phone or your laptop certainly keep
30:03
text together when people want so how can we go about doing that well there's a few different ways and in fact the
30:08
goal here is not so much to solve this one problem but to demonstrate and emphasize that in programming Python and
30:14
other languages there's so many ways sometimes to solve the same problem and here's one way to solve this problem let
30:20
me go in here and let me go ahead now and say hello comma and let me just add
30:27
to the end of that the user's name so I'm using Plus in kind of an interesting
30:32
way this is not addition per se I'm not adding numbers obviously but I do kind of want to add the person's name to the
30:40
string of text hello comma well let me go now down to my terminal window and run python of hello.py again enter
30:48
what's your name I'm going to type in David enter okay it's better it's better
30:53
but there's a minor bug albeit aesthetic here there's missing space but let's just use some intuition here well if I'm
30:59
missing the space after the comma why don't I go ahead and just add it manually here let me now rerun the
31:05
program python of hello.py enter David enter and there we go now we have something that looks a little prettier
31:11
in terms of English grammar hello comma space David and now if we rewind you
31:16
might have noticed before or wondered why I had this seemingly extra space
31:21
after my question mark namely here there's a space after the question mark but before the double quote and that was
31:27
just for Aesthetics to I wanted to move the user's cursor one space to the right so that when I type their name or they
31:33
type their name it's not immediately next to that same question mark there but there's other ways we can do this it
31:39
turns out that some functions print among them actually take multiple arguments and it turns out that if you
31:47
separate the inputs to a function the so-called arguments to a function with a comma you can pass in not just one but
31:54
two 3 four five onward so let me go ahead and pass in not just hello comma
32:00
space but that followed by name and this is a little confusing potentially at
32:05
first glance because now I've got two commas but it's important to note that the first comma is inside of my
32:10
quotation marks which is uh simply an English grammatical thing the second
32:16
comma here is outside of the quotes but between what are now two separate arguments to print the first argument is
32:23
hello comma space the second argument is the name variable itself so let's see how this looks python of hello.py enter
32:31
what's your name David enter okay I've kind of overcorrected now I've got two
32:36
spaces for some reason well it turns out and this is subtle when you pass multiple arguments to print it
32:43
automatically inserts a space for you this was not relevant earlier because I was passing in one big argument to print
32:51
all at once by using that plus operator this time I'm passing in two because of the comma so if I don't want that extra
32:58
space I don't need to pass in one myself I can just do this and now notice if I run this program again python of
33:05
hello.py type in my name David now it looks grammatically like I might want
33:10
now which of these approaches is better this approach uses a function print with two arguments hello comma and the name
33:18
variable the previous version recall technically used one argument even though it looked a little curious It's
33:24
one argument in the sense that the computer just like mathematicians are going to what's inside of parentheses
33:29
first so if inside of parentheses you have this string of text hello comma and a space which I need to add back then
33:36
you have a plus which means not addition per se but concatenation to join the thing on the left and the thing on the
33:42
right this ultimately becomes the English phrase hello comma space David
33:49
and then what's being passed ultimately to the function is technically something
33:54
like this but it's doing it all dynamically it's not me typing in David as I I secretly as I discreetly did
34:01
earlier it's figuring out dynamically what that value is after concatenating hello with the value of name and then
34:07
passing that ultimately to print as the sole argument let me pause here to see if there's any questions on numbers of
34:15
arguments now to functions can we use a function uh many
34:21
times to solve a certain problem which we can encounter many times in our code you can you can can use a function
34:28
many different times to solve some problem what we'll soon see though is if you find yourself as the programmer
34:34
solving a problem the same way again and again and again it turns out you'll be able to make your own function so that
34:40
you don't have to keep reusing the basic ones that come with the language I was
34:45
curious about the comma and the plus sign so after plus sign can we give just
34:51
one variable and after Comm again we give multiple variables like what is the difference a good question so in the
34:57
context of strings and I keep using that term string is a technical term in a programming language and again it means
35:03
a a sequence of text a character a word a whole paragraph even so the plus
35:09
operator is not just used as we'll see for addition of numbers in Python like we do on paper pencil but it also is
35:17
used for concatenation of strings on the left and the right if you did want to combine not just two strings left and
35:22
right but a third and a fourth you can absolutely keep using plus plus plus
35:27
plus and chain them together just like in math eventually that's going to start to look a little ugly I dare say
35:33
especially if your line of code gets long so there's better ways that we'll actually soon see and a good question as
35:39
well well let me come back to the code here in question and see if we can show you just a couple of other ways to solve
35:45
the same problem along the way emphasizing that what we're technically talking about here yes are strings but
35:50
there's even a technical term for these strings in Python it's just stir so to speak St for short for string as you may
35:58
know if you programmed in other languages people who invent programming languages like to be very uh succinct to
36:03
the point so we tend to use fairly short phrases to describe things not necessarily full words so while you
36:09
might say string technically in Python what we're really talking about these sequences of text are technically stirs
36:16
this is an actual type of data in a program but we'll soon see that there's other types of data in programs as well
36:23
in fact let's see if we can't improve this in one other way I like the progress we've made by keeping
36:29
everything on the same line hello comma David all on the same line what more though could we do in terms of solving
36:36
this problem well it turns out that we didn't have to give up entirely with using print twice let me rewind a little
36:42
bit and go back to that earlier version where I wasn't really sure how to solve this problem so I was using print once
36:49
to print out just the hello and the space and the comma and then I used print again to call uh to print name
36:55
that strictly speaking wasn't bad but there was this visual side effect that I just didn't like it just looked ugly to
37:02
have these two lines of text separate from one another but there's another way to fix this clearly it seems to be the
37:09
case that the print function is automatically outputting a blank line it's moving the cursor automatically for
37:15
me to the next line because that's why I'm seeing hello on one line and David on the next and then my prompt the
37:22
dollar sign on the line below that so print seems to be presuming automatically that you want it to move
37:27
the cursor to the next line after you pass it some argument but you can override that behavior again functions
37:33
take arguments which influence their behavior you just have to know what those arguments are and it turns out
37:40
that if we look at the documentation for Python's print function we can actually
37:46
look up at this URL here docs. python.org is where all of Python's official documentation lies if I poke
37:52
around I can find my way to more specifically this URL here where I can find all of the available functions in
37:59
Python that and the documentation therefore and if I go a little more precisely I can even find specific
38:05
documentation for the print function itself and rather than pull that up in a browser I'm going to go ahead and highlight just one line from that same
38:12
URL which is this and this is easily the most cryptic thing we've seen yet but
38:18
this is the official documentation for the print function and one of the best things you can do when learning a programming language is honestly learn
38:24
to read the documentation because truly all of the answers to your questions will in some way be there even though
38:31
admittedly it's not always obvious and I will say too Python's documentation isn't necessarily the easiest thing
38:37
especially for a first time or novice programmer it too just takes practice so try not to get overwhelmed if you're not
38:42
sure what you're looking at but let me walk you through this example this again is a line of text from Python's official
38:48
documentation for the print function what this indicates as follows is this the name of this function is of course
38:54
print then there's a parenthesis over here and another Clos parenthesis way over there everything inside of those
39:00
parentheses are the arguments the potential arguments to the function
39:05
however when we're looking at these arguments in the documentation like this
39:11
there's technically a different term that we would use these are technically the parameters to the function so when
39:16
you're talking about what you can pass to a function and what those inputs are
39:21
called those are parameters when you actually use the function and pass in values in inside of those parentheses
39:28
those inputs those values are arguments so we're talking about the exact same thing parameters and arguments are
39:34
effectively the same thing but they terms you use from looking at the problem from different directions when we're looking at what the function can
39:41
take versus what you're actually passing into the function so what does this imply well this syntax is pretty cryptic
39:47
but at the moment just know that an asterisk a star and then the word objects means that the print function
39:53
can take any number of objects you can pass in zero strings text one string like I did two strings like I did or
40:00
technically infinitely many if you you really want though that code's not going to look very good after that we see a
40:06
comma then we see another parameter here called sep short for separator in
40:11
English and notice the equal sign and the single quote space single quote so
40:16
quote unquote space I don't know what that is yet but I I I think we've seen a hint about it let's focus though for a
40:23
moment on this the print function takes another parameter called n and the default value of that parameter
40:30
is apparently based on this equal sign and these quotes back sln and what is
40:35
backs slash n if you'd like to chime in the chat anyone who's programmed before has probably seen this though if you've
40:41
never programmed before this might look quite cryptic back
40:46
sln means new line and it's a way textually of indicating if and one you
40:52
want the computer effectively to move the cursor to the next line create a new line of text and so technically if we
40:58
read into the documentation we'll see more detail on this the fact that there's a parameter called end in the
41:05
documentation for the print function just means that by default this print function is going to end every line with
41:12
back slash n you don't literally see backs slash n you see a new line you see the cursor moving to the next line now
41:18
by that logic let's move backwards sep for separator the default value of
41:24
separator is apparently a single Blank Space well where have we seen that well
41:29
recall in an earlier example when I passed in not just one but two arguments to the print function recall that they
41:36
magically had a space between them in fact they had that space plus my own space and that's why I deleted my space
41:42
because at that point it was extra so this just means that when you pass multiple arguments to print by default
41:47
they're going to be separated by a single Space by default when you pass arguments to print it's the whole thing
41:53
is going to be ended with a new line now just by knowing this and let me let me literally wave my hand at the rest of
41:59
the documentation for another day there's more things that print can do but we're going to focus just on sep and
42:04
on end let's see if we can't leverage this now to solve that original problem the original problem was this I don't
42:10
like how hello comma David is on two different lines well that's happening again because print is automatically
42:16
printing out a new line so let's tell it not to do that let's Tell It by passing
42:21
a second argument to the first use of print to say end equals
42:27
quote unquote not back sln which is the default automatically let's make it
42:33
quote unquote nothing else let's override the default value so there is
42:39
no new line there's literally nothing there and let's see what happens let me now go down to my terminal window and
42:45
clear it and I'm going to run python of hello.py enter I'm going to type in my name David and I think now everything's
42:52
going to stay on the same line because and it did this line here five is going
42:58
to print out hello comma space but then nothing at the end of it because I changed it to be quote unquote the
43:04
second line is going to print the name David or whatever the human's name is and it will move the cursor to the next
43:10
line because I didn't override the value of end there just to see this more explicitly if you do something cryptic
43:17
like well I have no idea what's going on let me just put in temporarily three question marks here we'll see the
43:23
results of this too let me go back down to my terminal window run python of. hi what's your name David and now you see
43:30
literally really ugly output but you see literally what's going on hello comma space then three question marks and that
43:38
print statement and then you see d a ID so not a good out outcome but it
43:44
demonstrates just how much control we have here too and let me rewind further recall that in our other version of this
43:51
when I passed in hello comma and name they were separated by a single space so
43:57
Pyon of hello.py D Aid enter that just worked well what if we override the
44:03
value of sep for separator instead of being one space we could say something
44:09
like uh question mark question mark question mark just to wrap our minds around what's going on there let me now
44:15
do python of hello.py David enter and you see two these two inputs hello comma
44:23
and the name are now separated in an ugly Way by three question marks Mar s because I've overridden the default
44:29
behavior of sep and even though the documentation uses single quotes I've been in the habit of using double quotes
44:34
in Python you can use either strictly speaking it doesn't matter but you should be consistent and I generally
44:40
always use double quotes Python's documentation though always uses single
44:45
quotes questions now on these types of parameters and allow me to propose that
44:51
we give these an official name up until now when we've been passing values to print those are called positional
44:58
parameters positional in the sense that the first thing you pass to print gets printed first the second thing you pass to print after a comma gets printed
45:05
second and so forth but there's also these things we've now seen called named parameters named sep separator or end
45:13
end D for the line ending those are named parameters because one they're optional and you can pass them in at the
45:20
end of your print statement but you can also call uh use them by name this may
45:26
be aird question but I was wondering uh what if someone wants to like add
45:31
actually qu quotation marks within the quotation marks yeah I like how you
45:37
think this is what we would call a corner case right just when we've made right this is this is all sounding great
45:42
at least as as programming goes but wait a minute what if you want to print a quote that's a really good question well
45:47
let's see if we can't figure this out suppose that I want to print out not just the user's name let me simplify
45:54
this further let me go ahead and get rid of a lot of this and let me just say something like
46:00
hello um maybe I'm being a little sarcastic here hello friend you know in
46:07
that kind of tone well this is not going to work actually because you are trying to use quotes to be like friend in
46:13
finger quotes but you're also trying to end the sentence and if I try running this let's do this python if hello.py
46:19
you'll see that this is just invalid syntax perhaps you forgot a comma and this is actually a bit annoying
46:24
sometimes the error messages you see are misleading like the computer the language doesn't really know what's
46:29
going on so it gives its best guess but it's not necessarily correct but I can solve this problem in a couple of ways I
46:36
can do this I can change my outermost quotes to single quotes because recall a moment get I said you could use double
46:42
quotes or single quotes so long as you're consistent so that's fine if you use single quotes on the outside you can
46:48
then use double quotes on the inside and you'll see them literally so for instance if I run python of hello.py
46:54
there we go hello friend but there's another way if you insist on using double quotes as you might want to just
47:01
to be consistent you can also use that backslash character again we saw the backs slash n a moment ago and that
47:08
meant we don't want a literal n to be in the output we wanted a new line so the backslash actually represents what's
47:14
called an escape character an escape character is one that you can't just type necessarily once on your keyboard
47:21
you need to express it with multiple characters so I can actually put backslashes in front of these inner
47:27
double quotes so that the computer realizes oh wait a minute those aren't literal those aren't quotes that finish
47:33
or start the thought they're literal quotes So now let me go back to my terminal window run python of hello.py
47:39
enter and now it's working as well so escaping is a general technique that allows us to do that too and if I may
47:47
let me rewind now on these examples and go back to where we left off with my
47:52
code I'm just undoing all of that because I want to get back to the point ultimately of specifying now a a final way of
48:00
solving this problem well it turns out that we have yet another way we can solve this problem which is perhaps the
48:07
most frequently done now or at least the most elegant when it comes to setting us
48:12
up for longer and longer uh uses of strings you can use a relatively new
48:18
feature of python that allows you to do this you can literally put not the name of the variable like that in your string
48:25
because we already saw this is right if you do this you will literally see hello comma name but what if I do this what if
48:31
I put curly braces or curly brackets around the variable's name notice vs code is actually very subtly changing
48:38
the color of it so vs code knows something interesting is going on here let me run this program but I'm not done
48:43
yet python of hello.py enter David enter okay obviously not what I want but I
48:50
need to tell python that this is a special string this is what we're going to call a format string or an F string a
48:56
relatively new feature of python in the past few years that tells python to actually format stuff in the string in a
49:03
special way and the symbol via what you do this is a little weird but this is what the world chose if you put a f at
49:11
the beginning of the string right before the first quote Mark that's a clue to
49:17
python that o this is a special string let me format this in a special way for you let me now rerun the program python
49:23
hello.py enter David enter and now we see the goal this whole time hello comma
49:30
David we don't start with this way because I think if we did this the first way you'd be like why are we doing this
49:35
what are all these magical symbols but this is just yet another way to solve the same problem but let me propose that
49:41
we consider now yet other things we can do with strings and it turns out that even as we've been doing some relatively
49:48
simple operations here we've generally been trusting that the user is going to cooperate and that is to say that
49:54
they're going to actually type in what we want them to type now now just because they type A String though doesn't mean it's going to look the way
49:59
we want you and I honestly as humans are actually in the habit on websites and apps of like accidentally hitting the
50:05
space bar a lot either at the beginning of our input or at the end maybe because the space bar tends to be so big it's
50:11
pretty common to get accidental spaces before or after some users input you and I are definitely in the habit of not
50:17
necessarily capitalizing words like we should if we're sending text messages we're probably being a little quick and
50:23
just sending everything in lowercase for instance if that's your style if your phone's not fixing it for you maybe in a
50:28
formal letter you would capitalize things properly but you and I as humans we can't really be trusted to type things in a nice way necessarily when
50:35
using some piece of software be it an app or website or something else but it turns out that strings themselves come
50:42
with a lot of built-in functionality and you can see all of that in Python's own documentation here the string data type
50:49
that we've been talking about comes with a lot of functionality built in that means that we can manipulate the user's
50:54
input to do more than just join it with something else like hello we can actually clean it up or reformat it in a
51:01
way that hopefully looks a little better for us so let me go back to my code here and let me just demonstrate what might
51:08
happen if a user doesn't cooperate if I go ahead here and run python of hello.py enter let me just sloppily hit the space
51:15
bar a few too many times why I just wasn't paying attention and I'm going to type in my name da viid and I don't know
51:21
I hit the space bar a couple more times like it's kind of a mess it's all lowercase that's not going to necessarily look grammatically right
51:28
it's got spaces here and here the program is going to print exactly that and that looks really bad at least if
51:33
we're prioritizing Aesthetics and grammar like why are there so many spaces after the comma this is not a
51:38
very nice way to greet your users but we can clean this up it turns out that
51:44
built into Strings which again is this data type so to speak this type of data
51:49
in Python is the ability to actually do things to that string so let me do this
51:54
I can actually go ahead and do something something like this uh name equals name.
52:01
strip and what does this do remove Whit space from
52:07
string and what do I mean by this well on the right hand side notice I've written the variable name called name
52:14
I've then used a period or a DOT and then I seem to be doing what's a function right anytime we've seen a
52:21
function thus far we see it's the the function's name print or input then we see a parenthesis then another
52:26
parenthesis and that's exactly what I see here but I'm using this function a little differently technically this function is in this context called a
52:33
method and what do I mean by that well if name is a string AKA stir well it
52:39
turns out according to the documentation there's a lot of functions that come with strings in Python and you can
52:46
access that functionality by using the name of a string like literally name here then a period Then the name of the
52:53
function and then an open parenthesis and a closed parenthesis Maybe some arguments inside of those parentheses
52:58
but in this case it doesn't need any arguments I just want to strip the space from the left and the space from the
53:04
right of the user's input but that's not enough I want to remember that I've stripped off that white space on the
53:10
left and the right so I'm going to use the equal sign again here and notice that just as before this doesn't mean
53:15
equality this means assignment from right to left so when this line of code here name. strip returns to me AKA a
53:24
return value it will return the same thing that the user typed in but with no more white space to the left or to the
53:30
white to to the right so then the equal sign assignment is going to copy that
53:35
value from the right to the left thereby updating the value inside of my name
53:42
variable so you can not only assign values to variables you can absolutely change the value of variables by just
53:48
using the assignment operator the equal sign again and again and again and it will just keep copying from right to left whatever the new value should be so
53:56
now now if I rerun this program python of hello.py enter I have Davi oh let's do
54:03
it again space space space space space daav ID in all lowercase space space enter it's better it hasn't fixed my
54:11
capitalization so I'm still being a little sloppy with the first D but it has stripped off all of that extra space
54:17
super Minor Detail right like this isn't all that exciting but it just speaks to the power of what you can do with just a
54:24
single line of code now what else can I do here well I could capitalize the user's input let me go ahead and try
54:30
this it turns out that I could also uh do this name. capitalize so let me go ahead and
54:39
capitalize uh user's name and again I'm making comments and there's no one right way to write the comments I'm just using
54:45
some short English phrases here to remind myself of what I'm doing what's now going on here well let me go ahead
54:50
and run python of hello.py enter uh space space space space space DAV ID space space enter
54:57
okay now it's looking prettier right no matter how the user typed in their name even a little sloppily I'm now fixing
55:03
that but let's let's try something I'm getting a little curious here how about this uh space space space space space
55:09
David space maen I'll use my last name now enter okay so ironically capitalize
55:17
is not really capitalizing everything we want it's clearly capitalizing what just the very first letter so it turns out
55:24
that again there's other functions in in Python that come with strings and if we poke around the documentation scrolling
55:30
through a URL like that I bet we'll find another solution one of which is actually this let's actually change this
55:37
to title there's yet another function that come with strings called title that
55:42
do title based capitalization just like a book or a person's name capitalizing the first letter of each word and this
55:50
is just going to do a little more work for us so let's go ahead and run this and as an aside I'm kind of tired now at
55:55
this point of typing python python python all the time it turns out that when using a
56:01
command line interface like this you can actually go back through all of your old commands what I just did a moment ago
56:07
was I hit the up arrow that immediately goes back through my history of all of the commands I've ever typed so this is
56:13
just a faster way now for repeat myself than typing everything manually let me go ahead and hit enter uh space space
56:20
space space space DAV ID mailin space space all lowercase enter now it's it's
56:26
looking better now I've capitalized things and cleaned things up but what about my code I've got like eight lines
56:32
of code now four of which are comments four of which are actual code do I really need this much well not
56:38
necessarily watch what I can also do in Python let me not bother capitalizing the user's name separately let me say
56:45
this and capital uh capitalize users name I can
56:51
chain these functions together I can add title to the end of this and now what's
56:57
happening well again with a line of code like this you first focus on what's to the right of the equal sign then we'll
57:03
get to the left of the equal sign what's on the right of the equal sign this line here well what does this mean get the
57:09
value of the name variable like daavid space m n then strip off the white space
57:15
on the left and the right that is going to return a value it's going to return da ID space m n without any white space
57:22
to the left or right what do you want to do with that return value you want python to title case it that is go
57:29
through every word in that resulting string and fix the first letter of the first word the first letter of the
57:35
second word and so forth and then now we can finish our thought copy the whole thing from right to left into that same
57:42
name variable and you know what I can take this even one step further why don't we go ahead and do this if we want
57:49
let me get rid of all that and let me just do strip and title all on that
57:55
first line and now we've gone from like eight lines of code to four it's a lot tighter it's a lot neater and even
58:02
though reasonable people might disagree it's arguably better because it's just easier to read fewer lines of code fewer
58:09
opportunities for mistakes it just allows me to move on with my next problem to solve all right let me pause
58:16
here and see if there's any questions on these methods a method is a function that's built in to a a type of value
58:23
like these functions are or on F strings which we saw a moment ago yes hi thanks
58:29
David um so is there a way to remove the spaces between the spaces that I might have added a short answer no if you read
58:37
the documentation at that same URL earlier you'll see that strip removes from the left and the right but not in
58:42
between in fact there's two other functions that come with strings one's called L strip the other's called R
58:48
strip that allow you to do one or the other if we want to start getting rid of space in the middle we're going to have to do a different trick Al together how
58:56
many functions can we combined like this do stripe do title you have combined so
59:01
how many we can combine yeah a really good question technically as many as you
59:06
want but at some point your codee's going to start to look really really bad right because the line of code's going
59:11
to get really really long it's eventually going to maybe wrap around again and again so at some point you
59:17
just kind of say like uhuh that's too many and you start breaking it up into multiple lines like I did maybe
59:22
reassigning the value to the variable as needed and this is actually a good question if I can pivot div off your
59:28
question I mean what do people think if we could go ahead and put everyone's hands down for a moment let me ask this
59:35
is the way I've done this now with strip and title and input all in the same line
59:43
better than my previous approach in Zoom you can use the yes icon or the no icon
59:49
if you think this version is better say yes if you think this previous version
59:54
was better for instance this one here where we had everything broken out say
1:00:00
no and then we'll see why in just a moment I proposed earlier that
1:00:05
reasonable people can disagree and that's absolutely the case doing it one way or the other isn't
1:00:12
necessarily best at least if you can justify it let me go back to the most recent version
1:00:18
here all right so we're seeing a lot of yeses and a lot of NOS why don't we go
1:00:23
ahead and and call on one of the yeses if if we could someone who's voting yes why do you think the current version of
1:00:30
this code is indeed better than the previous longer version of the code I
1:00:35
think it's more readable so I can say hey this is the name fun this is the name variable it gets some input and
1:00:42
then remove the space and give it a title and there you go you have a Hello name yeah I think that's pretty
1:00:48
reasonable it's very readable at least if you're in the habit as you are in English of reading left to right it just kind of flows very naturally as a result
1:00:55
the lines is not really that long it's certainly fitting nicely onto the screen so I think that's a good argument how
1:01:00
about a Counterpoint though someone who voted no if we could call on someone who thinks this is worse uh because it's not
1:01:07
avilable at all uh it seems like uh it's a very long uh line so I think
1:01:15
it's better to separate yeah I I think that's persuasive too right it's getting a little longer and even though my
1:01:22
sentence here what's your name is relatively short you could imagine that this could get even uglier quickly if I
1:01:27
were asking a longer question of the user that's going to make this line of code even longer and therefore less
1:01:33
readable it might be less obvious to me or my colleagues that I am calling strip or that I am calling title it might be
1:01:39
kind of a unexpected surprise so I think that's reasonable too in short there is no right answer here and in fact part of
1:01:46
the process of getting better at programming is getting your own sense of style or working for a company where
1:01:52
they might prescribe which way is better than the other because they just want everyone doing the same thing even though reasonable people might uh
1:01:59
disagree ultimately though so long as you have what's a pretty good argument in favor of one way or the other like
1:02:06
ultimately that's what's important if you're just doing things because you don't really know which one's better that's not great but if if and when you
1:02:12
start to acquire opinions and if your boss if your teacher if your colleague your friend can challenge you and say
1:02:17
wait why did you do it like this they might not agree with you but at least have an answer and that should be sufficiently persuasive in general now
1:02:25
strings come with a whole bunch of other methods as well among which is one called split which can as the name
1:02:30
suggests split a string into multiple smaller substring so to speak for instance if the human here is in the
1:02:36
habit of typing in their first name then a space and then their last name and you want to go ahead and greet them only by
1:02:42
first name well we could actually leverage that single space between the first name and last name and split that
1:02:47
string into two smaller substrings how can we do this well let me go ahead and in between these lines proactively
1:02:53
comment that we're about to split user's name into first name and last name and
1:03:00
then let's go ahead and take that name variable which currently contains something like presumably David space Ma
1:03:06
and let me go ahead and call split and pass in as the argument to split a single white space thereby indicating
1:03:13
that I indeed want to split on that character now it turns out split's going to return a sequence of values ideally a
1:03:19
first name and then a last name and we can actually in Python assign both of those values from that sequence at once
1:03:25
to some variable for instance first comma last equals and that's going to have the effect from right to left of
1:03:31
putting the first such value in the first variable the second such value in the second variable so now on my last
1:03:37
line of code I can go in and say hello not to the full name something like David man I can just say hello comma
1:03:43
first all right let's go ahead and clear my terminal window run python of hello.py and hit enter I won't bother
1:03:49
with any leading Whit space this time but let me go ahead and type in David space maen and crossing my fingers is as
1:03:55
usual hello David is what we now see all right so we've seen so much so many
1:04:02
examples thus far involving strings but certainly programs uh and programming languages can manipulate other types of
1:04:09
data as well let's go ahead and transition then to another very common type of data in Python in programming
1:04:15
more generally namely integers otherwise known in python as int int so just as
1:04:20
stir St Str is short for string so is INT in Python short for integer well what's in an integer well just like in
1:04:27
math it's a number like -2 Nega 1 0 1 2 and all the way toward negative Infinity
1:04:33
all the way toward positive Infinity but there's no decimal point in an integer it's just a number like -2 Nega 1 0 1
1:04:40
and two onward that's an INT of course in the world of mathematics there's lots
1:04:46
of symbols that we use and we've seen plus before although we used it for different purpose but python supports
1:04:51
these symbols and more and python allows you to add numbers together plus subtract numbers uh multiply numbers
1:04:58
divide numbers and the only one here that might look a little strange to people or unfamiliar is this percent
1:05:04
sign but it doesn't mean percent in this context if you use a single percent sign in a Python program that's actually the
1:05:10
so-called modulo operator the operator that allows you to take the remainder after dividing one number by another so
1:05:18
we'll see examples of that before long but the first four of these are perhaps quite quite familiar well it turns out
1:05:24
that in Python you cannot necessarily you don't necessarily have to keep writing code in a file like hello.py and
1:05:32
then running it in a terminal window one of the features that many people like about python is that it supports this a
1:05:38
so-called interactive mode like you can start writing python code and immediately execute each of those lines
1:05:45
interactively if especially if you don't care about saving all of your lines of code you just want to execute code and
1:05:51
get back some answers so for instance let me go back to VSS code here and let me close hello pi and let me click on
1:05:57
the Little Triangle over here in my terminal window just to make it much bigger just temporarily for a moment so
1:06:03
I'm not creating any piy file now I'm just going to run python by itself at my
1:06:08
prompt and you'll see when I do this I get some cryptic looking output and the date and time at which the program was
1:06:15
last updated and so forth but I ultimately get three triple uh brackets
1:06:20
like this this is the interactive mode for python so I'm running the python
1:06:26
interpreter and anytime I type A Comm a line of code in The Interpreter it's going to execute it immediately I don't
1:06:32
have to keep running python again and again it's as though in the human world if you were standing next to a human who
1:06:38
speaks some other language and you're just having a conversation with them back and forth It's all happening the
1:06:43
translation immediately so what might I do in interactive mode well I could do something like 1 + one enter that's
1:06:50
actually code right you might not think of it as code but if you know a bit of arithmetic and you know uh numbers and
1:06:56
you know plus that's valid python code and you can use Python really as a fancy calculator but I could do other things
1:07:02
too if I want to print to myself hello comma world I can also print out that line of code there too hello world so
1:07:09
it's interactive in the sense that the moment you execute a line of code boom you see the result we're generally not
1:07:15
going to do that because at least when teaching the language we tend to want to do things incrementally and we want you
1:07:21
to be able to see where it is we came from and we want to be able to try things again in again especially if we
1:07:26
make mistakes but know that this is indeed a feature of python this so-called interactive mode but let's
1:07:32
focus for a moment now not just on that interactivity but really on the fact that python apparently supports integers
1:07:38
and Mathematics and some of those basic operations and let's see if we can't make maybe our our own little calculator
1:07:44
so let me go ahead and open up vs code again and I'm going to shrink down my terminal window and I'm going to create
1:07:50
a new file called calculator. piy so to do that recall I can type code down here
1:07:55
here and the name of the file I want to create Pi enter that gives me a new tab
1:08:00
up top so I have already closed hello.py I'm now in calculator. piy and let's just make a simple calculator that does
1:08:07
some addition for me but I'm going to do it in a file so that we can iterate on this and make changes For Better or For
1:08:13
Worse over time let me go ahead and first declare a couple variables I'm going to do the mathematical thing of
1:08:18
calling my first variable X my second variable Y and then I'm going to give myself a third variable Z equals x + y
1:08:26
and then I'm going to go ahead and print out Z now this program admittedly not very exciting or interesting in fact
1:08:33
it's a little less interesting than printing stuff on the screen like before with strings but we'll build on this and
1:08:39
see what other features exist in Python that we can leverage so hopefully if python knows its math as well as I do
1:08:45
when I run python of calculator. piy I should see hopefully that 1 + 2 equals
1:08:52
indeed three all right so not that surprising and not that that interesting and honestly this isn't the most useful
1:08:58
program because it's always going to calculate 1 + 2 equal 3 let's at least
1:09:03
make this program say a little more interactive right we already know from previous examples how we can get input
1:09:08
from the user let's bring back that input function and let's do this let me go ahead now and at the top of my code
1:09:15
let's change X to not be the number one always let's change it to be whatever the return value is of asking the user
1:09:22
for x and I can use any English or human language I want here I'm going to say what's X just like I asked before what's
1:09:29
your name and I'm going to do the same thing for y I'm going to use input again but this time change the question to be
1:09:35
what's why all right at this point I think I'm going to leave the rest of the code the same Z equals X Plus Y and then
1:09:42
print Z but what's nice now is that I think I have a nice interactive calculator right now it's not going to
1:09:49
do 1 plus two all the time it's going to do whatever the user types plus whatever the user types so let's try this let me
1:09:55
go ahead and run the program all right let's do it one is going to be x two is
1:10:00
going to be Y and of course everyone in agreement 1 + 2 equals
1:10:08
3 huh what's going on there either your math class misled you
1:10:16
or I have misled you why don't we call on someone here to see if you can't help us reason through what the bug is what's
1:10:23
the mistake uh on jalli if I'm saying it right I think the issue is is that it's
1:10:29
concatenating strings because you use the plus operator instead of adding perfect so perfect intuition we've seen
1:10:35
that plus is used a little differently in the context of strings because it concatenates that is it joins the two
1:10:41
strings and that seems to indeed be what's happening here even though the user types a number but the interesting
1:10:46
thing here is that when you get user input because they're using a keyboard on their Mac or PC or their phone it is
1:10:53
always going to be text it might look like a number but by default it's coming from the keyboard as a string that is as
1:11:00
text and so how do we go about re uh resolving this if ultimately we don't want to treat those inputs as strings we
1:11:08
want to treat them as actual numbers well we need another function and it turns out in Python that you can convert
1:11:14
sometimes from one type of data to another type of data for instance from string to int by doing something like
1:11:21
this let me go back into my code and let me change X before adding it to Y to be
1:11:27
whatever the integer version of X is plus whatever the integer version of Y
1:11:33
is so it turns out that int is not only a type of data in Python it's also a
1:11:38
function and it's a function that if you pass in an input like a string so long
1:11:44
as that string looks like a number like one or like two it will convert it to an
1:11:49
actual number that you can perform mathematics on instead so if I now go back to my terminal window and run
1:11:55
Python and let me show you another trick calculator is kind of a long word it's a little tedious to type notice what I can
1:12:01
do in my terminal window in a command line interface in general if I start typing C for calculator I can actually
1:12:09
hit tab to finish my thought so autocomplete is possible in a terminal window like this type the first letter
1:12:15
or few letters and then boom with tab it'll finish your thought for you or you can go back in your history like I did
1:12:21
with the up and down arrows let me go ahead and execute this what's X X1 what's X2 and there we go now we have a
1:12:28
general purpose calculator that's going to support not just uh addition of one and two but now any two integers that
1:12:35
the user types and let me now improve this right we've seen how we can make improvements to code and I don't know if
1:12:42
it's going to necessarily be better but let's try this do I really need the Z variable it's worth noting that I'm
1:12:49
creating a variable called c z and then I'm immediately using it on the next line of code now that's not that
1:12:56
compelling because if you're creating a variable and then immediately using it but never again using it did you really
1:13:02
need to take the time to introduce another symbol and another variable just to use it once and only once well maybe
1:13:08
not maybe we don't really need Z in this way maybe I should go and do something
1:13:15
uh like this maybe I should get rid of Z here maybe I should change this to be
1:13:21
int up here change this to be int up here here doing something that's pretty
1:13:27
interesting now even though it's a bit of new syntax notice that you can Nest
1:13:32
function so to speak you can put one function call that is the use of a
1:13:38
function inside of the use of another function so that the return value of the inner function becomes the argument to
1:13:47
or the input to the outer function so just like in math if you have parentheses parentheses parentheses your
1:13:52
teacher probably taught you to focus on what's inside the innermost parenthesis first and then work your way out same
1:13:57
thing with programming that's what Python's going to do it's going to look at what's inside of the parenthesis first it's going to get the answer and
1:14:04
then it's going to pass the return value to the outermost function so what happens on line one now is that the
1:14:10
input function gets called first then the result of that quote unquote one
1:14:16
becomes the input to the int function and same on line two the output of
1:14:21
what's y becomes the input to this int function and now there is no Z I could
1:14:28
just do print x + y and because I've taken the time to convert each of those
1:14:33
strings to an integer I think we're okay so let me try this python of calculator. piy enter one and two and we're still
1:14:42
getting three not 12 or not 12 one two we're indeed getting three and we've
1:14:47
additionally gotten rid of the variable because we didn't necessarily need it it seems especially if only using it once
1:14:53
well here too let me put everyone's hands down for just a moment and let me ask as before this version now which
1:15:00
uses int around the invocations of input and does not use Z is this better than
1:15:07
the previous version if you want to vote yes go ahead or if you prefer the old Way vote no the old way I'll undo all of
1:15:15
this as we vote instead looked like
1:15:20
this all right and let me go back to now the newest version let's take a hand of the is someone who thinks this latest
1:15:27
version is better I think this way is better because it uh allows us to
1:15:33
immediately see what the X and Y variables are with um integers and so we
1:15:40
know what to expect from them and also the print argument is more U intuitive
1:15:47
we avoid too much clutter uh in the codes I think those are all good reasons it's nice and succinct the lines of code
1:15:54
are not very long uh I don't need to know what Z is because it doesn't exist it just see
1:15:59
print X Plus y I like that but someone who prefers the older way where we did have Z and we more explicitly passed
1:16:06
individual variables to the int function yeah hi uh I think the earlier version
1:16:12
is better because when uh I mean if user inputs something else other than in
1:16:17
let's say I mean let's say the type one and two like so it be it will be easier
1:16:23
to debug this version or the this version here or the old version the old
1:16:28
version okay that's fair and in fact I'm I'm being very careful today as best I
1:16:33
can not to mess up I have thus far only inputed integers when I'm expecting integers and R is actually pointing to
1:16:40
something we'll come back to in the coming weeks how do we actually handle errors what if the user doesn't type in
1:16:45
the number one or the number two or a number at all what if they type in a word like cat c a t that's not a number
1:16:52
and I bet I can't convert it to an integer but for today I'm not going to focus on that I'm just going to hope that the user cooperates but that's not
1:16:58
going to be the case and so perhaps one way would set us up for more success when it comes to handling those errors
1:17:04
now for today's purposes which is better h i mean I like both and I think both of you made very valid arguments in there
1:17:10
too so long as you have a justification that feels pretty reasonable I mean that's what ultimately matters but
1:17:16
acquiring again a sense of the tradeoffs here well is this way better if so why
1:17:22
or why not just understanding what those trade-offs are but generally speaking prioritizing readability is a very good
1:17:28
thing making your code readable for someone else is a very good thing and very good for you too so that when you
1:17:34
wake up the next morning or you come back the next week or the next year you too can read your own code without having to waste time trying to remember
1:17:41
what you did and simplicity tends to be a good thing too keeping your code simple so is as you get more comfortable
1:17:48
with programming you might be tempted to try to like combine an entire program into one long line for instance let me
1:17:54
do right just that that don't technically speaking we don't really need X in a variable we don't really
1:17:59
need Y in a variable we could also do this I could just get rid of X and Y Al
1:18:05
together I could then now eliminate that and make it just one line of code okay
1:18:10
so on some sense you might be inclined to think wow that's really nice you made it one simple line of code I would argue
1:18:17
this actually isn't that simple now I think I'm starting to Nest too many things I have to think about print and
1:18:23
int and input I then have to notice that okay I've opened two parentheses I've closed two of them there's a plus you're
1:18:29
making me think too much and anytime you make me think you're wasting time and anytime you complicate the look of the
1:18:35
code like this you're just going to increase the probability of mistakes syntactical mistakes or logical errors
1:18:41
in your code so of all the things we've done this is the only one that I would argue yes it's one line and it's nice
1:18:48
and compact it's just not readable enough I would shy away from doing this especially since two of those function
1:18:53
calls are getting input from the user but there too reasonable people might disagree but that's the kind of like
1:18:59
visceral reaction you should have sometimes when code starts getting a little too complicated a little too
1:19:05
clever perhaps for its own good all right well it's not just integers we have access to let me
1:19:12
propose that we transition from integers to one more data type here namely a float so again a string is a sequence of
1:19:20
text an INT is an integer like negative 1 0 and one a a float is a number with a
1:19:26
decimal point properly called a floating point value and you can think of the floating Point as being the decimal that
1:19:32
might be over here or over here with some number of digits to the left or the right mathematically it's a real number
1:19:37
a number that has a decimal point in it so that's a third type of data that python supports right now our calculator
1:19:44
is somewhat naively assuming that the user is only going to type in integers but if I want to support floating Point
1:19:49
values too I think I can just make a couple of tweaks so I'm going to go back to VSS code here and instead of just
1:19:56
converting the user's input X and Y to integers on line one and two let's just make a simple change let's actually
1:20:02
convert it to a float on the first line and a float on the second line here now
1:20:09
I think if I go down to my terminal window and run python of calculator. Pi let's type in a number like 1.2 with a
1:20:16
decimal point and 3.4 with the decimal point and there we go we have 4.6 as the
1:20:21
final answer so that wouldn't have worked before if I were only expecting integers from the user but now that I'm
1:20:27
support expecting floating Point values and accommodating it I can actually now do floating Point arithmetic as well but
1:20:34
suppose that I don't really want the final answer to be a floating point
1:20:39
value like 4.6 I would be happy if we just round to the nearest integer so I want to support the user typing in
1:20:46
floating Point values with decimal points but at the end of the day I just want to round the result to the nearest
1:20:51
possible integer for instance well it turns out out that here too python comes
1:20:57
with some functionality built in and in fact if we return to this URL from earlier where in all of the Python
1:21:03
built-in functions are listed there's one called round which does exactly as we would expect it takes as input a
1:21:09
number and then rounds it for us for instance to the nearest digit to the nearest integer but if we look a little
1:21:16
closer at that documentation as we can here I'll provide an excerpt this is what the function looks like in the
1:21:22
documentation and recall that earlier we looked at the documentation for print and this is similar in spirit that this
1:21:28
shows us not just the name of the function but it's available parameters that is inputs that we can provide when
1:21:34
using this function but this is a little cryptic too just like Prince was and it adds some syntax so let's see the name
1:21:40
of this function here is of course round and its first argument is a number notice this times there's no star
1:21:47
there's no star objects like there was for print the round function takes just one number as its first argument period
1:21:54
that's it positional parameter but notice this syntax and this is a convention in programming or technology
1:22:00
more generally generally speaking when you see square brackets in documentation like this this means that you're about
1:22:06
to see something optional and so what this means is that if you want to specify more precisely the number of
1:22:13
digits that you want the round function to round to you can specify it here by
1:22:19
adding a comma and then that number so if we read the documentation if you don't specify a number of digits you
1:22:26
just specify the number to Round it rounds to the nearest integer but suppose you want to round to the 10's
1:22:32
place or the hundreds place that is one or two digits after the decimal point you could additionally pass in comma one
1:22:38
or comma 2 to be more precise so that's what the documentation there is saying
1:22:44
let's see if we can't then translate this to some actual code for us so if I go back now to vs code and I consider
1:22:51
that I want to go ahead and round X and Y I can do this in a couple of ways I could do round X+ y but uh you know I'd
1:23:00
actually kind of prefer to break this now out into two lines I don't have to and reasonable people here might disagree but I'd like to revert to a
1:23:07
scenario where I'm printing Z so that I can just a little more clearly to myself to others say Z equals the rounded
1:23:14
result of x + y it's not necessarily the better way to do it but I'm a little
1:23:19
more comfortable with breaking out my thoughts one at a time especially if I want to start commenting of these chunks
1:23:25
of code all right let me go down to my terminal window now and run python of calculator. Pi what's X let's do 1.2
1:23:31
again then let's do 3.4 and now it was previously 4.6 but now it's been rounded
1:23:38
up to the nearest integer which of course is going to be five all right what if I wanted to change this a little
1:23:46
further what if I wanted to support maybe really big numbers big numbers irrespective of rounding let's just do
1:23:52
something like this let me go ahead and run python of calculator. Pi again and let me just add
1:23:58
999 + 1 and notice I don't have to type decimal points even though I'm
1:24:03
converting to float my program will just allow me to type decimal points but I don't need to oblige the answer of
1:24:09
course here should be and is in fact 1,000 whether or not we round so that's just arithmetic with integers here but
1:24:16
in uh the us we tend to format long numbers by putting commas uh after or
1:24:23
before every triple of digits other countries flip it and they use periods and commas instead that's a system
1:24:29
setting you can change that on your own Mac or PC or device for python or any language but for me I'm using the uh us
1:24:36
approach here which is periods for decimal points and commas for separators what if I wanted this to be outputed as
1:24:42
1 comma 0000 just to make it a little more clear that it's 1,000 and not something like
1:24:49
100 that's even more useful when it's like 1 million 1 comma 00 comma 00 0
1:24:56
wouldn't it be nice if we could automatically output those numbers as well well it turns out that we can there
1:25:02
is a way using python to actually specify that we want to include commas
1:25:07
like this and here we have an opportunity to bring back our old friend the F string first let me do something
1:25:14
that's not that productive first let me do this let me print out the value of Z but wait a minute I can't just say quote
1:25:20
unquote Z because that's literally going to print Z on the screen so let me wrap it with those curly braces like I did
1:25:26
before but that two was not enough I literally needed to add an F at the beginning of my string to tell python
1:25:32
that this is an F string a format string that now is going to print out not very interestingly just the value of Z itself
1:25:40
so that I'm going to Great Lengths just to print Z when really I could have just passed Z as the sole argument but just
1:25:46
to ensure that I haven't broken it let's do this again 999 + 1 enter okay it's
1:25:52
still a th so I didn't make anything worse but notice and this syntax is unfortunately a bit cryptic notice that
1:25:59
I can actually do this I can put a colon after the Z and I can put a comma
1:26:04
thereafter this looks very cryptic admittedly and even I have to constantly look things like this up in the
1:26:09
documentation to remember the syntax but here let me run it again python of calculator.
1:26:17
9991 and now notice that the number has been automatically formatted for me if I
1:26:22
were in a different country or local I could abs absolutely override this to use periods instead of commas or vice
1:26:27
versa but in this case here it's just happening for me automatically so there too we see a hint of what it means to
1:26:33
really format a string there's even more power more powerful capabilities built into that all right let me pause here to
1:26:40
see if there's any questions now on floats on rounding or on this use of f
1:26:47
strings yes so I have a question so when using floats um is it like a cap to how
1:26:52
many decimal points you can have a really good question so floats yes and this is a problem we'll revisit before
1:26:58
long floats cannot represent numbers infinitely precisely in a nutshell
1:27:04
because computers only have so much memory they only have a finite amount of memory you and I only have a finite uh
1:27:09
amount of Hardware inside of the computer so at some point they're going to have to Round right now I'm rounding
1:27:15
automatically effectively computers will eventually have to do that for us but we'll see that as a fundamental problem
1:27:20
before long allow me to turn back just for a few final examples on Flo before we introduce a few final examples that
1:27:27
allow us not just to use functions but to make our own let me propose that we also try our hand at a bit of division
1:27:34
here let me propose that we modify this calculator now to still take a couple of floats but let's now just do something a
1:27:40
little simpler than uh a little different from this just doing x ided y and let me go ahead and get rid of my
1:27:46
format string and just keep it simple for now printing out Z instead and what are we going to see here well just some
1:27:52
simple division so python of calculat Pi let's do something like 2 / 3 and of
1:27:58
course I get 66666 and to Ethan's question a moment ago it does seem to be finite it's not rounding in a weird way
1:28:05
here but I only seem to see so many digits that's a uh an inevitability of
1:28:10
using a float in this way by contrast just so you know integers nowadays in Python can be as big as you want them to
1:28:17
be unlike other languages there is no upper bound on how big an INT can be now in Python but there is a bound on just
1:28:23
how precise prise a floating point value can be all right now that I've got some simple division working here let's go
1:28:29
ahead and round this it would be nice to round this really long number 6666666
1:28:34
and so forth to maybe just two decimal places we've seen how to do this with round though at least in its
1:28:39
documentation let's just round this not to the nearest int by passing in just x
1:28:44
/ Y which is one argument once the math is done inside of the parenthesis I don't want to pass in just one argument
1:28:51
I want to pass in two so that I can specify n digits number of digits which recall was the second parameter for
1:28:58
round let me go ahead and run python of calculator. Pi I'll do the same thing two and then three 67 so here too we see
1:29:06
a way of rounding now not just to a nearest integer but to a nearest number of digits but there's another way to do
1:29:13
this here and in fact this evokes our our uh F F string example again let me
1:29:19
go ahead and change this suppose that you didn't remember the round function or for some reason you didn't want to
1:29:24
use it you instead want to just use a format string well let's go there let me do quote unquote Z but let me surround
1:29:31
it with those curly braces let me add the F at the beginning and again this is not interesting yet this is just going
1:29:37
to print out Z but I'm adding a lot more complexity to turn it into an F string but notice I can do something else after
1:29:44
my variable name after the colon if this were going to be a big integer I might
1:29:49
want to use a comma like before to separate each triple of numbers with commas but I don't I'm going to use a
1:29:55
different sequence uh of characters I'm G to say 0 2f and this too is one of
1:30:01
these very cryptic things I have to constantly look up because I forget if I don't use it that often so don't be
1:30:06
intimidated if this looks especially weird but this is according to the documentation the way you specify using
1:30:12
an F string how many digits you want to print so let me run this version of the calculator type in two and then three we
1:30:19
get the exact same thing but again this is just consistent with my claim that in program we can so very often solve the
1:30:26
same problem in multiple ways this is just now the F string approach to that
1:30:32
very same problem all right which one is better it depends in this case they're pretty equivalent you could imagine
1:30:38
though it being useful to use a function sometime so that you can pass in an argument like n digits as that second
1:30:44
argument or you can imagine just deciding in advance that you want Point 2 and then writing it like this let's
1:30:51
transition now from focusing on string and on integers and on floats to focusing now on functions themselves we
1:30:58
began today by focusing on how you can use functions that come with python but wouldn't it be nice if you could invent
1:31:04
your own functions especially if to our Point earlier you find yourself solving the same kind of problem again and again
1:31:10
it's nice that python comes with the print function because it's really useful to be able to print things on the screen but wouldn't it be nice if you
1:31:16
could print specific things on the screen by just calling your own function well let me propose that we do this let
1:31:22
me go back to VSS code here and let me propose that we go back to hello.py I'm
1:31:27
going to reopen hello.py where we left it before and I'm going to go ahead now and propose that we consider how we can
1:31:34
start improving this further by making our own function I have written so many programs today that just say hello and
1:31:41
each time I'm using print but wouldn't it have been nice if from the beginning of today we could just call a function
1:31:47
called hello that just says hello for us now the authors of python years ago didn't think that we a special function
1:31:55
just to say hello but I would like that to exist I'm saying hello so many times I just want to be able to call a
1:32:00
function hello so I'm going to start from scratch here I'm going to delete all of my code from earlier and I'm
1:32:06
going to pretend for the moment that a function called hello exists and I'm going to do just as I did before I'm
1:32:12
going to get the user's name with the input function asking what's your name question mark and now I'm going to call
1:32:18
a function hello and then I'm going to print out the user's name now I will
1:32:24
admit hello doesn't exist so bad things are about to happen but let's see what let me go down to my terminal window let
1:32:31
me run python of hello.py I think the first Line's going to be okay because that worked before
1:32:37
and indeed it's prompting me for my name so let me type in David the second line of code is apparently calling a function
1:32:44
that looks like it's called hello because why is it a function it has a parenthesis and a Clos parenthesis immediately after it and that's what
1:32:50
every function we've used has looked like but Python's not going to recognize this one when I hit enter now I get a
1:32:56
name error name hello is not defined did you mean help I didn't although it's
1:33:01
opportune that's what I need at this point is some help but I am encountering this error because why the function just
1:33:08
doesn't exist so how do I make this function exist well I need to create it myself using this keyword defa defa for
1:33:16
Define so here too just as stir is short for string and int is short for integer
1:33:21
def is short for Define if and when you want to Define create invent your own
1:33:27
functions you can do so using now this keyword in Python so let me go back to
1:33:32
my code here and let me propose that we Define this perhaps in this way at the
1:33:38
very top of my file I'm going to first take a moment to define a function called hello using def hello open
1:33:45
parenthesis close parenthesis colon what this means now is that python is going
1:33:50
to treat every line of code that I IND underneath this one as the meaning of
1:33:56
this new function hello So Def is important as is the space I get to choose the name of the function and I'm
1:34:03
choosing to call it hello the parentheses with nothing inside means that this function at the moment is not going to take any inputs no arguments
1:34:09
there too the colon means stay tuned for some indentation everything that's indented beneath this line of code is
1:34:16
going to be part of this function it's going to be a super short function one line of code it's just going to print
1:34:22
out quote unquote hello but now on lines one and two I have invented my own function hello notice
1:34:30
these dots that have now magically appeared here this is just a setting of my text editor VSS code in this case
1:34:35
that's just making super explicit to me that I've hit the space bar four times or equivalently the Tab Key once which
1:34:42
is converted automatically to four spaces generally speaking I'm going to need to make sure that all of my
1:34:47
indented code lines up now so that python knows that it's all part of the same thing but it's easy in this case
1:34:53
cuz it's just a single line but now thanks to lines one and two the function
1:34:58
hello will absolutely exist when I'm ready to use it on line six so let me go
1:35:03
down to my terminal window and run python of hello.py enter here comes my name again and now when I hit enter I
1:35:11
now see hello David all right we've kind of regressed though right this is not nearly as pretty as it once was I think
1:35:18
we can probably do better than this by improving things further why don't we
1:35:23
consider though how we might say parameterize the same function that is
1:35:28
to say can we customize hello to maybe take the user's name as input so that we can say not only hello but the person's
1:35:35
name all on one line all in one breath well I think we can do this let me
1:35:40
propose that we do this as follows let me go ahead and up in my code let me
1:35:46
inside of these parentheses let me come up with my own parameter name I have complete Choice here and I'm going to
1:35:52
say that the name of of my parameter will be the word two why because I want my function to sound like the verb it
1:36:00
represents hello but who do you want to say hello to well I'm going to call my parameter for this function to just CU
1:36:07
in English it kind of sounds nice to me hello to who do you want to say hello to that's why I'm calling this parameter to
1:36:13
instead of something simpler like X or Y or Z all right well what do I want to do with the word to well I can do a couple
1:36:19
of different things we've seen like so many different ways to implement hello let me just add a comma there for
1:36:24
grammar's sake and then let me put the word to after that as the second
1:36:30
argument to the function hello there's other ways we can do this and we've seen so many but this one looks a little
1:36:35
clear to me I'll say what's going to happen next well I don't think I need this extra print line here I think what
1:36:42
I'm going to do is this I'm going to go ahead here and print out not the person's name manually I'm going to
1:36:49
inste instead say hello parentheses name so what am I now doing on lines one and
1:36:55
two I'm defining my very own function called hello but this time that function has been designed to take a parameter a
1:37:02
single parameter as input and I'm using the value of that parameter which I
1:37:07
called two to plug into print so that I see not only hello but also that person's name what am I doing on line
1:37:14
five same as always I'm just getting the user's name line six I'm not only calling hello I'm passing as input the
1:37:21
name variable as an ARG argument so that that's what gets passed into hello and
1:37:27
what's Happening Here is essentially this even though the variable is called name here when the function itself is
1:37:33
called the computer assumes that that same value is now called two so name is
1:37:40
essentially copied to another variable called two so that in the context of hello I can say hello to that variable
1:37:48
instead and we'll see in a moment what happens if we don't keep those uh straight let me go ahead and run python
1:37:54
of hello.py enter what's your name and now I'm crossing my fingers enter there we go we're back in business but now I
1:38:01
have my own custom function called hello that's allowing me to say hello to a specific person and here's where now
1:38:07
things can get really fancy what if you wanted your hello function to say hello to someone specific but you know what if
1:38:13
you don't know who you want to say hello to you want to say hello to the whole world you can give parameters default
1:38:18
values we've seen that recall that with print there was a default value for sep for the separator there was a default
1:38:25
value for end the line ending we can do that too and here's the syntax if you
1:38:30
want the value of this parameter by default if not provided by the
1:38:35
programmer to be equal to quote unquote world you literally do that in the same
1:38:41
line you're defining the function and I'll admit it's starting to look more cryptic but I'm still just defining a
1:38:46
function called hello it takes a parameter called two but I'm assigning it with the equal sign a default value
1:38:54
of quote unquote world just in case the programmer doesn't call hello with an
1:38:59
argument and we can see this here let me change my code to use hello in two ways
1:39:04
on line five I'm going to very simply call hello no arguments then on line six
1:39:10
I'm going to get the name line seven I'm going to call hello with an argument so you'll see hello now being used in two
1:39:16
ways let me go ahead and run python of hello.py I'll type in my name oh
1:39:21
interesting notice I already see hello world but that's expected because line five happens before line six but once I
1:39:29
type my name now the program is going to be a little more polite and say hello to me personally so there too we see with
1:39:37
relatively simple but new syntax how you can Implement functionality very similar
1:39:42
in spirit to what the print function gave us automatically now you have control over doing that yourself but let
1:39:49
me now make this point too one of the whole points of defining your own function is one just to avoid having to
1:39:55
repeat yourself again and again you don't have to actually keep Reinventing the wheel and keep using the print
1:40:01
function again and again and again if you just want to say hello wouldn't it be nice now if I could kind of move this
1:40:07
code that I wrote for defining the hello function and just to be dramatic I'm going to hit enter a whole lot of times
1:40:14
50 lines down and put my definition of hello way further down in this file why
1:40:20
well just in the spirit of out of sight out of mind because if I now rewind to the start of my program now you can sort
1:40:27
of take for granted that oh hello is a function why because it's there on line one and it has an open parenthesis and a
1:40:32
closed parenthesis which up until now has meant call this function and then on line two we're getting a variable from
1:40:37
the user by typing in their name and then we're calling hello passing in that value well at this point I can just take
1:40:44
for granted that hello exists even if it's way down further in the file or as we'll see in future weeks even if it's
1:40:49
in a different file altogether but there's a problem here and let me go ahead and run this version of
1:40:56
hello.py notice that as soon as I run The Interpreter python of hello.py I see
1:41:01
a name error name hello is not defined again did you mean help well again
1:41:07
fitting I do need some help here but I didn't mean to call the function help the problem here though is that python
1:41:13
is just taking me literally I have defined my function hello all the way down here but I'm trying to use it way
1:41:20
up here and that's not allowed Python's interpreter is going to take you literally and if you use a function it must already exist by the time you are
1:41:27
calling it so how do I fix this well apparently I can't do that I have to Define any functions I want at the very
1:41:34
top of my file but that too could get me into a bit of trouble eventually because
1:41:39
if I constantly have to define a function above where I want to use it you're kind of writing code in Reverse
1:41:45
you're constantly writing functions up here up here up here as opposed to like writing your code logically top to bottom so let me fix this in a more
1:41:52
standard way which is to do this generally speaking you do want to put
1:41:57
the main part of your code at the top of your file and in fact I'm going to go so far as to Define my function called main
1:42:05
it's not a requirement but it's indeed a convention and this just connotes to the reader that this is the main part of my
1:42:11
program I'm going to get rid of my empty hello call now and only pass in one version with hello name and then down
1:42:18
here a couple lines further down I'll actually Define my hello function unfortunately now that I've reordered
1:42:24
the functions in this way by putting the main part of my code at the top and hello at the bottom so that my logic
1:42:30
kind of flows top to bottom if I go ahead and run python of hello.py enter
1:42:36
nothing whatsoever happens if I do it again nothing whatsoever happens well why in the world is this well just
1:42:43
because I've defined a function called Main and I've defined a function called hello doesn't mean that I've actually
1:42:48
called that is used either of them yes I'm using hello in side of main but no
1:42:54
one is telling python to actually use or call Main so in order to tidy this up
1:43:00
the last thing I need to do in this file it seems is actually call my main function and in fact by calling my main
1:43:07
function in this way it gets me out of trouble because now I'm defining main first but I'm not calling hello yet I'm
1:43:13
defining hello next but I'm not calling hello next I only at the very end of this file call Main which has the effect
1:43:21
of running this code up here which has the effect of running this code down here and it allows me therefore to
1:43:27
organize my file and Order My functions in any way I want including main at the
1:43:32
very top and solving ultimately that problem of python not knowing what's going on now it's important to note that
1:43:39
I defined my function hello as taking an argument to and then I passed into that
1:43:44
function the value of the variable that I wanted to say hello to that is the variable called name because suppose I
1:43:50
had done something a little bit differently suppose that I hadn't defined hello is taking an argument so I
1:43:55
just remove mention of two and its default Value World and I go back up to
1:44:00
my main function and I just call hello itself without passing in any arguments
1:44:06
and now let me go ahead and make one more change one more mistake technically let me go ahead and just try to naively
1:44:12
print out the value of name in the hello function so now to be clear in my main function on line two I'm defining my
1:44:19
variable called name and assigning it the return value of the input function from the user I'm then just calling
1:44:24
hello in my hello function which now no longer takes any arguments I am calling
1:44:30
print passing in hello comma and then immediately passing in name the variable
1:44:35
into which I got the user's input but the catch is that name exists now only in Maine and so watch what happens when
1:44:41
I try to run this version of the program with python hello.py I hit enter I'm prompted for my name DAV ID enter and ah
1:44:49
a name error name name quote unquote is not defined so it turns out that this is
1:44:54
actually an issue of what's called scope scope refers to a variable only existing
1:44:59
in the context in which you defined it so in so far as I Define this variable name in my main function I can only use
1:45:07
that variable in my name function I can't use it as I've tried to here in my hello function it doesn't exist in that
1:45:13
so-called scope and so this is why now if I rewind and undo all of those
1:45:19
changes you'll see that I'm deliberately passing main from my main function into my hello function and now in the hello
1:45:26
function it technically has a different name it's called two in that context but that's fine it's completely up to each
1:45:31
individual function to name its own variables or name its own arguments but this is a way now that I'm handing to
1:45:37
the hello function the value of that variable so it can be printed by hello as well and there's one final flourish
1:45:44
we can add here now that we've implemented hello you'll notice that hello only has a so-called side effect
1:45:50
it only prints out something to the screen well what if I also want my function to not have a side effect per
1:45:57
se but actually hand me back a value recall that the input function returns a
1:46:03
value the string that the user typed in recall that the int function returns a value the float function returns a value
1:46:10
that was passed into it well you can use one final keyword here literally return
1:46:16
to return a value explicitly yourself in fact let me go back to VSS code here and
1:46:21
I think we'll return our attention to calculator. Pi and see if we can't
1:46:26
Implement one other version of calculate calculator. pi that actually has our own
1:46:31
function that even returns a value so I'm going to go ahead and open up uh calculator. pi and I think this time I'm
1:46:38
going to throw everything away as before and I'm just going to start practicing what we're preaching here Define a
1:46:45
function called main which is now going to be the main part of my function let's go ahead and now declare a variable
1:46:51
called X and assign it to the converted version of the user's input after asking
1:46:57
them what's X so again a line of code quite like we've done before and suppose
1:47:02
now that what I want to do is square this value I want to take the number that the user typed in and raise it to
1:47:07
the power of two so 2 squar would be 4 3 squar would be 9 4 squar would be 16 and
1:47:14
so forth well how do I go about implementing a function literally called Square which actually doesn't come with
1:47:19
python built in well let me assume for the moment that it does exist and let me say something like this let me go ahead
1:47:26
and say that uh printing how about uh X2 is
1:47:33
comma square of X so what have I done I've defined a function called Main and
1:47:38
I've implemented two lines the first of these lines prompts the user for a value X and converts it to an INT and stores
1:47:45
it in a variable called X on line three I then say x^2 is and then I pass a
1:47:51
second argument to the print function whatever the return value is of a square function but Square doesn't exist and
1:47:58
I'll show you this here if I now call Main at the bottom and I run python of
1:48:04
calculator. Pi I'll see that X is two and then I see
1:48:11
a whole bunch of Errors a name error name square is not defined so this isn't a typo here it's just the function
1:48:17
doesn't exist but I think I can make it exist here let me go ahead and Define another function called Square
1:48:23
this one's going to take in a number and I'm going to call it generically n as many a programmer would just to
1:48:28
represent any old number and then what do I want to do in order to square n
1:48:34
well a numbered squared is really just itself times itself so I'm going to do this n * n but it's not enough just to
1:48:42
do the math yourself n * n you're going to have to return the actual value n
1:48:47
times n and that's our new keyword here when I now do this Watch What Happens python of calculator. Pi enter X sh say
1:48:55
shall be 2 x^2 is 4 let me go ahead now and say x is now three X2 is now 9 so
1:49:04
I've implemented my very own function that Returns the square of a value and because I'm using the return keyword
1:49:10
that ensures that I can pass the return value of this just like the return value of input or int or float to another
1:49:17
function like print instead and here too there's going to be so many ways to solve the same problem I can actually
1:49:23
raise n to the power of two we've not seen the syntax before but if you use two two asterisks like this two stars
1:49:30
that raises the thing on the left to the power on the right or it turns out there is in Python a function called pow for
1:49:37
raising something to the power that takes two arguments the first of which is the number the second of which is the
1:49:42
exponent so there too there's just so many ways to actually solve that same problem as well so ultimately what we
1:49:50
have we done here we first introduced functions these or verbs many of which come built into python that you can just
1:49:55
use in your own code we then introduced variables via which you can store those return values and then maybe do
1:50:01
something more with it at the end of the day too you now have the ability to create to invent your own functions to
1:50:06
solve simple problems like hello or in the weeks to come much more sophisticated more challenging more fun
1:50:12
problems as well