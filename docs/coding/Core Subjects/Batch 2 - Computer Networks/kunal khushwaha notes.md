Timestamps: 
0:00 Introduction
4:50 How it all started?
17:38 Client-Server Architecture 
22:00 Protocols 
24:20 How Data is Transferred? IP Address 
34:23 Port Numbers 
42:25 Submarine Cables Map (Optical Fibre Cables)
48:00 LAN, MAN, WAN
52:20 MODEM, ROUTER
55:47 Topologies (BUS, RING, STAR, TREE, MESH)
1:01:34 Structure of the Network
1:06:33 OSI Model (7 Layers)
1:29:00 TCP/IP Model (5 Layers)
1:30:20 Client Server Architecture
1:38:18 Peer to Peer Architecture
1:39:52 Networking Devices (Download PDF)
1:43:05 Protocols
1:50:22 Sockets
1:51:10 Ports
1:53:12 HTTP
2:00:00 HTTP(GET, POST, PUT, DELETE)
2:04:44 Error/Status Codes
2:06:30 Cookies
2:11:00 How Email Works?
2:19:00 DNS (Domain Name System)
2:32:24 TCP/IP Model (Transport Layer)
2:47:35 Checksum
2:49:00 Timers
2:54:00 UDP (User Datagram Protocol)
3:02:05 TCP (Transmission Control Protocol)
3:09:10 3-Way handshake
3:13:40 TCP (Network Layer)
3:21:50 Control Plane
3:24:30 IP (Internet Protocol)
3:38:45 Packets
3:41:42 IPV4 vs IPV6
3:49:50 Middle Boxes
3:52:32 (NAT) Network Address Translation
3:55:40 TCP (Data Link Layer)


Chapter 1: Introduction
0:04
4 seconds
hey everyone welcome back to another video and in this video we're doing a complete computer networking course which is important for the current boot
0:11
11 seconds
camps that I'm running and the future boot camps as well because if you're a developer then networking is you know important uh how networking works even
0:19
19 seconds
if you're a mobile developer or a web developer for example or like we're doing the devops boot camp right now
0:26
26 seconds
right um so it's crucial right it's extremely important so the the a little bit of like a motivational thing that
0:34
34 seconds
I'll tell you is when I started with like computer science in my in my college I had the thrill of uh you know like how things are working so I used to
0:43
43 seconds
look at like what is RAM how does RAM work how do computers work what are the computer architectures what happens when the computer starts up how does the
0:51
51 seconds
internet work when I type www.google.com how does it display the web page what are all the internals and everything so in this little story that
1:00
1 minute
I mentioned there are a lot of components how computers work how this thing works how that things works and so on and so forth this is the sort of
1:07
1 minute, 7 seconds
mindset you need to have if you want to be a great you know like developer and like uh be an extraordinary student if you will so in this video we'll learning
1:16
1 minute, 16 seconds
about how internet works okay computer networking so please watch it completely it's going to be a long video because it's going to cover like everything
1:23
1 minute, 23 seconds
about how internet internet works so we look at like what is internet basic stuff how it's how it started right what
1:31
1 minute, 31 seconds
were the early days like how it has evolved over the years and then technical uh technical deep types so what happens when you enter a URL what
1:39
1 minute, 39 seconds
is a URL how it gets resolved what is a server what is a client what is the you know protocol what are the protocols The
1:46
1 minute, 46 seconds
OSI model and how actually how things are working you know in a story format because even though we'll be learning
1:54
1 minute, 54 seconds
about the textual uh textbook stuff obviously but that is something everyone can teach there is something you can find everywhere um one thing I'll try to
2:02
2 minutes, 2 seconds
put it in a way is um make learning fun as I always do in every single of my one of my videos uh storytelling uh uh
2:10
2 minutes, 10 seconds
format right so that you have fun while learning so we're starting with the internet and uh this is the complete D boot camp that we are currently going on
2:19
2 minutes, 19 seconds
so you can check out the links in the description we also have a complete data structure algorithms boot camp for interview preparation so for that you can also find the links in the
2:26
2 minutes, 26 seconds
description and then you can clear uh any Fang interview with that preparation it's free everything is free so make sure you check it out all right so when
2:34
2 minutes, 34 seconds
we talk about like computer networks right what does it mean what what do we mean by computer network in in simple terms it's it's just uh computers
2:42
2 minutes, 42 seconds
connected together right that's it someone in my college also if they ask me some technical definition or whatever
2:48
2 minutes, 48 seconds
right oh no you know that movie uh 3D it's it's a movie Bollywood movie they ask what is a machine and that that guy
2:55
2 minutes, 55 seconds
literally like says a lot of things I have never been that guy I could not care less uh about the big big
3:02
3 minutes, 2 seconds
definitions okay what is computer uh so there computers computer also has a full form if you didn't know commonly
3:09
3 minutes, 9 seconds
oriented machine particularly used for training Education and Research that's the uh full form of computer I I I
3:16
3 minutes, 16 seconds
memorized it because in my high school my teacher they used to ask us this thing every day so anyway uh what is a
3:25
3 minutes, 25 seconds
network computers connected together that is a network no no problem that is a network right then what is the internet so internet is basically a collection of these computer
3:34
3 minutes, 34 seconds
networks okay so my computer is connected to my sister's computer her computer is connected to someone else's computer and our computers are connected
3:41
3 minutes, 41 seconds
to like you know the Wi-Fi or whatever and that is connected to other people's computers and sort of like this these this connection of con computers
3:49
3 minutes, 49 seconds
connecting with computers this connection is basically spread across like you know houses cities countries so on and so forth so this entire
3:58
3 minutes, 58 seconds
connection on a global scale it's known as the internet okay so I don't think I have to draw anything about it but uh this is a
4:07
4 minutes, 7 seconds
network computer a connected to computer B okay if this is like spread across a
4:15
4 minutes, 15 seconds
large region or countries or whatever know everyone connected to each
4:23
4 minutes, 23 seconds
other like whatever like this is the internet okay so internet is a comp collection of computer
4:30
4 minutes, 30 seconds
networks let's look at like uh we all know this right we all know what computer is we all know these basic basic definitions and everything but
4:38
4 minutes, 38 seconds
let's look at uh what do we actually mean like how did it start and uh how are they actually connected that is what
4:46
4 minutes, 46 seconds
we are going to be focusing on this course let's look at how it all started so let's talk about how the internet started let's go to you know the very
Chapter 2: How it all started?
4:53
4 minutes, 53 seconds
beginning of uh of this era so what happened was that the Cold War was going on and there was the United States and
5:01
5 minutes, 1 second
the the Soviet Soviet Union and they they were like battling with one another like who is going to be the very first
5:09
5 minutes, 9 seconds
okay so when it came to you know um launching the world's first satellite so the United States and you know the
5:16
5 minutes, 16 seconds
Soviet Union uh you know Russia they were like hey um who is going to launch the very first satellite we want our names to be written in history for
5:25
5 minutes, 25 seconds
example so Russia won the Soviet Union uh one they launched Sputnik in around
5:31
5 minutes, 31 seconds
1950s somewhere 1957 to be precise so that was the very first satellite but now the the US were like okay this is
5:39
5 minutes, 39 seconds
not cool we wanted to be the first how so what do we do how do we not miss out on further opportunities like for example we want to be the first to you
5:47
5 minutes, 47 seconds
know step on the moon we want to be the first on this or that or whatever right so you us was like okay this is not cool this is not working we want it to be the
5:55
5 minutes, 55 seconds
first uh so the US government they created a uh a program arpa so arpa is known as advanced
6:02
6 minutes, 2 seconds
research projects agency okay so they were like hey you are supposed to you know uh do all the
6:09
6 minutes, 9 seconds
scientific uh discoveries and keep our country number one okay so what happened was that uh arpa you know they they
6:19
6 minutes, 19 seconds
wanted to like have a some sort of a way to communicate with each other okay so arpa had like facilities they had their
6:26
6 minutes, 26 seconds
buildings or whatever okay so they had their buildings in ious parts of the United States okay but they were like Hey how do we communicate with them it's
6:35
6 minutes, 35 seconds
becoming very difficult you know buildings are so much far far away from each other so they developed something called the
6:42
6 minutes, 42 seconds
arpanet okay so arpanet was basically uh uh there were like four uh four places where these computers you can say were
6:51
6 minutes, 51 seconds
first was at like MIT okay second was at like Stanford
7:02
7 minutes, 2 seconds
third was at I believe UCLA and there was one more uh University of
7:11
7 minutes, 11 seconds
Utah they were like connected to each other or whatever okay something like that so now
7:18
7 minutes, 18 seconds
basically this is what they had so they were like hey we can now communicate with one another we want to sell some files or what you know whatever you want
7:24
7 minutes, 24 seconds
to do you can do it they were using PCP for this transmission control protocol what what is TCP it's a very important
7:31
7 minutes, 31 seconds
topic TCP IP IP addresses UDP and you know file file the the the how simple mail transfer protocol all these things
7:39
7 minutes, 39 seconds
we'll be covering in detail okay so don't worry TCP forget about what TCP is let me tell
7:47
7 minutes, 47 seconds
you what it like what what do we mean by these protocols and stuff so basically in simple terms um you are sending an
7:57
7 minutes, 57 seconds
email to someone okay they that may require some steps obviously I'm sending an email to someone it will require some
8:05
8 minutes, 5 seconds
steps it like hey first send this email over here then send this email to that person they will then download it from the server and then they will read that
8:13
8 minutes, 13 seconds
email or whatever that will happen okay you want to talk to your friend okay so you're talking to your friend hey you connect with a friend make a establish a connection then you
8:22
8 minutes, 22 seconds
send your video they receive your video they send your they send their video you receive their video and you're talking on video conferences and some of the
8:29
8 minutes, 29 seconds
frame rates drop or whatever happens when network is not stable right you want to send a file that is very
8:37
8 minutes, 37 seconds
important and you don't want anything to be removed from that file while it's being transferred okay you're like hey I want to send these special secret
8:44
8 minutes, 44 seconds
documents and uh obviously all the data has to be sent no data should be lost okay
8:51
8 minutes, 51 seconds
so this is what you can say different type of things I am trying to send over the Internet make sense email video
9:00
9 minutes
secure files so many things different types of things I'm trying to send over the Internet so different types of rules
9:07
9 minutes, 7 seconds
will be required okay there might be some rules set by someone hey if you're sending a secure file the internet should make
9:16
9 minutes, 16 seconds
sure that 100% of the data that you have sent to your friend will be delivered if you're video conferencing with your friend then the internet can
9:24
9 minutes, 24 seconds
drop a few pictures or frame rates because it does not matter that much okay so these rules that are set up by people how a particular data is being
9:33
9 minutes, 33 seconds
sent these are known as protocols similar there's this TCP protocol IP protocol UDP so many other things okay
9:43
9 minutes, 43 seconds
now you know what TCP IP UDP and stuff the category is individually what it is we'll look into later on what is the
9:50
9 minutes, 50 seconds
difference between TCP UDP how email works and everything else okay sound good so this was like
9:59
9 minutes, 59 seconds
the very first computer sorry internet stuff okay cool this organization is still available like there still like
10:07
10 minutes, 7 seconds
they have been renamed but they are still in practice okay so that's basically about it and uh after that you
10:14
10 minutes, 14 seconds
know as Years Years progressed uh more and more inter uh more and more computers were added more and more locations were added to the aranet and
10:23
10 minutes, 23 seconds
uh that's it yeah started falling like DCP IP just write IP over here as well that's it
10:31
10 minutes, 31 seconds
okay as simple as that so right now we are in the very early stage of the internet it does not have like really with like consumers or what it's more
10:39
10 minutes, 39 seconds
like research focused okay you're only able to talk to one another like this okay via some protocols we still
10:48
10 minutes, 48 seconds
use like tcpip but how it has changed quite a lot let's look into that okay
10:54
10 minutes, 54 seconds
cool so one problem happened was that but
11:01
11 minutes, 1 second
uh as this was a research project many people wanted to share their like research papers and stuff which was not really working in this particular
11:10
11 minutes, 10 seconds
domain okay so basically the idea was that um I want to be able to share some
11:19
11 minutes, 19 seconds
documents that reference like some other documents or whatever okay so what happens is that uh I want to send a
11:27
11 minutes, 27 seconds
research paper from MIT to standard transfer for example this is a research paper it has a link in it this link is
11:33
11 minutes, 33 seconds
linking to another research paper Okay so this automated sharing
11:43
11 minutes, 43 seconds
this was missing previously okay so someone is like hey
11:52
11 minutes, 52 seconds
imit has sent me a document on uh about something like uh you know um
11:59
11 minutes, 59 seconds
apples or something and there's some other information about apples in another document I need some sort of a way that
12:07
12 minutes, 7 seconds
I just click this link and it will Point me towards that document then that research paper or
12:14
12 minutes, 14 seconds
whatever comes into picture www the worldwide web you must have heard about Tim burners right so Tim burners uh you
12:24
12 minutes, 24 seconds
know developed the worldwide web okay so worldwide web is a project that basically stores these
12:32
12 minutes, 32 seconds
documents okay okay you can store and you can access these documents via the worldwide
12:40
12 minutes, 40 seconds
web all right you can actually check out the very first website that was created as well let me show you okay this is the world's first website info.ch hypertex www. pro.
12:53
12 minutes, 53 seconds
HTML so don't confuse yourself with worldwide web K what is worldwide web where is it stored okay whatever no it's
13:00
13 minutes
just a universal like it's it's allowing you access to all these documents and it has all these links okay if I click on
13:10
13 minutes, 10 seconds
technical how to provide data okay you have plain text files you have script and things like
13:19
13 minutes, 19 seconds
that okay you have to make a server we all know we we learning how how to make servers and everything worldwide web you
13:26
13 minutes, 26 seconds
can see on Wikipedia as well it's where do documents and other web resources are identified bya a url url like this you
13:33
13 minutes, 33 seconds
know we all know about what a URL is which may be interl by hyperlinks there are so many links that are interlined in this web page and they are accessible
13:41
13 minutes, 41 seconds
over the Internet that's it that is the worldwide web a collection of all these pages and
13:48
13 minutes, 48 seconds
everything okay and it's published by web
13:55
13 minutes, 55 seconds
servers you can host your own server Okay so now you know where this all these things is stored on web servers how servers work we'll cover later
14:05
14 minutes, 5 seconds
on okay so URLs and everything uh URL and everything we'll talk more about more about later but uh this is basically about it this was the world's
14:14
14 minutes, 14 seconds
first website okay this is it but you'll be like Kunal there's a problem here there is no
14:23
14 minutes, 23 seconds
search engine like how do I search for something if I want to search for something how do I search for it you
14:30
14 minutes, 30 seconds
can't you can't search for anything in this so This option was not available okay so to answer your question how did we search for things then you couldn't
14:39
14 minutes, 39 seconds
okay you just go to hyperlinks from hyperlinks you can you could save it in like some indices but it could not scale to like you know when there were like so
14:47
14 minutes, 47 seconds
many pages coming up and things like that so in the end they had to develop search engines Yahoo I believe was the
14:54
14 minutes, 54 seconds
very first one um but you can check out more about it like in the history of search engines you can go to Wikipedia and you can check it out then we had
15:01
15 minutes, 1 second
search engines and now that's it that we are now you know in the history of internet now now a lot lot more things
15:08
15 minutes, 8 seconds
are coming up you know like web 3 and things like that and so so on and so forth like I'm not sure like uh you know
15:16
15 minutes, 16 seconds
uh where we'll where we'll head up but uh but you know where we're going so yeah that's the modern internet now we have search engines and everything but
15:24
15 minutes, 24 seconds
that's like the brief history okay now let's learn about you know the protocols thing that I was mentioning so you might have a question Kunal why even we want
15:33
15 minutes, 33 seconds
protocols why do we need these rules you know so imagine you are making an application okay and someone else in
15:40
15 minutes, 40 seconds
some other country is making an application you have some different rules about how your application can communicate with some other one's
15:47
15 minutes, 47 seconds
application they have a different rule like I will con communicate with another applications in a different way so can
15:54
15 minutes, 54 seconds
you really communicate with each other no no you can't that is why it is extremely important to
16:01
16 minutes, 1 second
have like a set of rules and regul regulations okay so these rules and regulations who writes these I'm talking about I want to send
16:10
16 minutes, 10 seconds
an email okay so every single person who sends an email to another person across the world you know have there have a
16:19
16 minutes, 19 seconds
that email is being sent using a set of rules and regulations okay first this will happen then this will happen then this will happen but who made these
16:27
16 minutes, 27 seconds
rules who controls these rules who creates the new rules the internet Society right now I'm just telling you
16:35
16 minutes, 35 seconds
all the cool stuff but uh how it works how the every step happens that we'll cover later on okay so the internet
16:42
16 minutes, 42 seconds
society as you can see over here uh this is the internet society and they are the ones who are responsible for all these
16:50
16 minutes, 50 seconds
things okay so how do we actually make submissions we can do that by RFC RSC means I
16:58
16 minutes, 58 seconds
believe request for comments okay so you can set a document like hey I have this idea about some feature of the internet or whatever you can please you know
17:06
17 minutes, 6 seconds
check it out so you can submit it on on this page it's usually submitted by you know very high professionals or whatever but anyone can submit submit until
17:15
17 minutes, 15 seconds
unless they have like an like till they have an idea okay so the internet Society comes up with all these rules
17:22
17 minutes, 22 seconds
and stuff you can learn more about them over here internet society.org okay so now let's talk a little bit more about some technical terms we know like how
17:31
17 minutes, 31 seconds
internet started now and everything but only mentioning about these protocols right the protocols and how
Chapter 3: Client-Server Architecture
17:39
17 minutes, 39 seconds
the like we know what is happening but we don't know how it's happening like I know what the internet is how it started but we still don't know how it works so
17:49
17 minutes, 49 seconds
before that let's You Know cover a few terms and stuff so you may have heard about servers okay what is a server you
17:56
17 minutes, 56 seconds
may have may have heard about a client so what is a client so example you have your computer right this is you you have
18:04
18 minutes, 4 seconds
your uh computer and um you write here
18:11
18 minutes, 11 seconds
google.com Okay you click enter it sends a request to the Google
18:22
18 minutes, 22 seconds
server and Google sends back a response to your computer
18:31
18 minutes, 31 seconds
client server
18:38
18 minutes, 38 seconds
okay you write google.com again this is a very broad explanation every single D construction of it like a deep dive of
18:46
18 minutes, 46 seconds
how this is happening internally what are the actual steps that are being taken and I will actually make the picture clear in your mind how the
18:54
18 minutes, 54 seconds
internet works okay A little bit of a spoiler alert you know the various countries and various continents across
19:01
19 minutes, 1 second
the world we are connected via wires these wires are laid underground under the
19:08
19 minutes, 8 seconds
ocean that's how we are literally connected so internet is not like in the cloud it's actually under the sea I'll tell you more how these things work
19:16
19 minutes, 16 seconds
internally later on but the simple idea is right now let's focus on what we are doing okay then then I'll talk you talk to you talk to you about how we are
19:24
19 minutes, 24 seconds
doing it so basically you write google.com Okay Google it it it this basically your
19:32
19 minutes, 32 seconds
computer sends a request to the server Google's server okay and the server gets that response Ser is like okay I got your
19:40
19 minutes, 40 seconds
response uh I got your request here's what you wanted there you go take all these take all these things it sends
19:48
19 minutes, 48 seconds
back a web page and a bunch of other things a response is sent back to you
19:59
19 minutes, 59 seconds
okay so does this mean that you cannot be the server yourself when you're like your own computer cannot be a server it definitely can
20:07
20 minutes, 7 seconds
be that is known as when you work on Local Host and stuff okay so your same computer can actross a server also and a
20:15
20 minutes, 15 seconds
client also okay let's just give you an example of this okay here let me write
20:25
20 minutes, 25 seconds
google.com web page loaded how what happened so there's a bunch of things inspect ele
20:33
20 minutes, 33 seconds
inspect so inspect basically shows me all the things Network I'll refresh so many things
20:41
20 minutes, 41 seconds
happened okay in this one request these many things happened okay a get request was made and get request was made and so on and so
20:50
20 minutes, 50 seconds
forth and these are all the things you know like status 200 means everything is okay and everything so you got like HTML
20:57
20 minutes, 57 seconds
uh and uh you got like J some JavaScript and PNG and HTML Json files and so on so forth so all these things we got back
21:05
21 minutes, 5 seconds
from Google and it created this web page okay let's do a deep dive into this like how this thing is working and how
21:14
21 minutes, 14 seconds
google.com gets resolved to IP addresses or forget about IP addresses let's talk about what are IP addresses okay what are these protocols and everything let's
21:23
21 minutes, 23 seconds
and what is this like status code what is this get what is this um you know post and get let if I refresh it you can
21:31
21 minutes, 31 seconds
see there's get there's post what is this method what is this domain what is this status code what is this indicator
21:39
21 minutes, 39 seconds
initiator what is this type and what does this mean by like this transferred what is this B and KB what is this size
21:46
21 minutes, 46 seconds
what is this thing what are these milliseconds everything will cover okay so if you want to see all the
21:54
21 minutes, 54 seconds
HTML that we got and everything and you can see like what is this thing everything we cover right now okay so let's do it okay so before that let's talk a little bit about protocols that I
Chapter 4: Protocols
22:02
22 minutes, 2 seconds
mentioned previously so what are protocols Protocols are just um rules that are defined by the internet Society
22:11
22 minutes, 11 seconds
okay they're like hey these are the rules this is how data is transferred and everything okay so there are some like basic basic protocols there's like
22:18
22 minutes, 18 seconds
TCP which we'll look into details okay so TCP is known as transmission control
22:26
22 minutes, 26 seconds
protocol Okay so so the idea is that it will ensure that the data will reach its
22:33
22 minutes, 33 seconds
destination and it will not be like uh corrupted on the way okay so there's something you
22:41
22 minutes, 41 seconds
definitely want the person to get completely you should use it will be using TCP in your applications okay there might be another
22:50
22 minutes, 50 seconds
examples like UDP so when you do not care about if 100% of the data is reaching your friend or not whomever you want to send the data
22:59
22 minutes, 59 seconds
for example video conferencing okay so not all data may be reaching and that is totally fine by
23:05
23 minutes, 5 seconds
this that is totally fine by us another one is HTTP UDP means uh user datagram protocol
23:15
23 minutes, 15 seconds
the next protocol is hyper text transfer protocol okay this is being used by web
23:24
23 minutes, 24 seconds
browsers the worldwide web okay so it basically defines um the format of
23:33
23 minutes, 33 seconds
the um you know uh the data that is being transferred between your like uh
23:40
23 minutes, 40 seconds
when we talking about www so web clients basically and web servers okay clients and servers Okay cool so when a client
23:49
23 minutes, 49 seconds
over here in this you can see sends a request to a server so these particular things like Client
23:57
23 minutes, 57 seconds
Center request to a server server will send something back all of these things are uh given inside HTTP how the server
24:05
24 minutes, 5 seconds
will send back the data that is also a rule that is given in HTTP okay we'll talk more about that later HTTP https and everything okay
24:15
24 minutes, 15 seconds
cool so it's basically about it but don't worry we'll go into details of it as well like how it works and everything okay okay one more thing that we'll
Chapter 5: How Data is Transferred? IP Address
24:23
24 minutes, 23 seconds
cover later on and I'm just giving you a brief about is how data is transferred okay um you know everything in online is
24:31
24 minutes, 31 seconds
like uh in computers everything is zero and one okay so it's it doesn't make sense to send the entire data at
24:39
24 minutes, 39 seconds
once suppose you want to send a large file over the Internet do you send the entire file in just one single go no it
24:46
24 minutes, 46 seconds
comes in chunks isn't that correct same things happen with these sorts of things like uh when you loading a web page
24:53
24 minutes, 53 seconds
watching a movie online or whatever data you'll be getting will be in packets
25:00
25 minutes
okay sound good let's refresh so you can see these are like individual calls and you're getting
25:08
25 minutes, 8 seconds
different different packets of data all right okay so we have to cover about packets
25:16
25 minutes, 16 seconds
also packets are to be covered there's one more thing when you write google.com Okay how does it find which
25:25
25 minutes, 25 seconds
server to connect to or whatever okay so basically these computers and servers they are all identified via
25:35
25 minutes, 35 seconds
something known as an IP address so you can think of it as your uh phone book okay so in computers what
25:43
25 minutes, 43 seconds
happens is that uh sorry in like phone numbers what happens is you have your so many friends right you have let's say
25:50
25 minutes, 50 seconds
200 contacts and uh when you call want to call someone you just dial their name okay just like hey call Mommy and it will call your m
25:59
25 minutes, 59 seconds
okay or call suchin or someone okay anyone you want to call do you type their number all the time no so what is
26:06
26 minutes, 6 seconds
happening actual value is some number 9 9 91 1 1 9 something like that this is being linked to a
26:14
26 minutes, 14 seconds
name okay name like John or something you want to call John you just call John
26:21
26 minutes, 21 seconds
and it will directly dial this number this is the same thing for IP addresses and
26:29
26 minutes, 29 seconds
stuff okay all the devices that are connected together you are watching me right now okay you are connected to
26:35
26 minutes, 35 seconds
YouTube right now okay so YouTube server okay you are interacting with the YouTube server so every single device on
26:43
26 minutes, 43 seconds
the internet that can talk to each other they have something known as an IP
26:49
26 minutes, 49 seconds
address okay IP address so
26:55
26 minutes, 55 seconds
example um X x x x this is a format and
27:01
27 minutes, 1 second
every single X can have the numbers from 0 to
27:08
27 minutes, 8 seconds
255 okay you write google.com it will be resolved to a particular IP address I hope it makes
27:17
27 minutes, 17 seconds
sense what is an IP address okay sound good so we'll talk in detail about IP
27:26
27 minutes, 26 seconds
address there are like classes of IP address that are reserved for example okay that no one can use or whatever okay and how it actually like
27:34
27 minutes, 34 seconds
Works Cool sound good if you want to check IP addresses of your own computer you can you can do that as well you can use the
27:43
27 minutes, 43 seconds
curl command and you can use like the command
27:49
27 minutes, 49 seconds
C if config do me- s you can use this command it will give you your IP address of your um the
27:58
27 minutes, 58 seconds
internet internet provider okay so how does this work Kunal do everyone have the same IP
28:06
28 minutes, 6 seconds
address or what is the IP address of my devices if my device is connected to uh if let's say you are at your house
28:15
28 minutes, 15 seconds
you have a router like a modem and a router and uh um you you you have like four devices connected to your Wi-Fi so
28:23
28 minutes, 23 seconds
all these four devices are they going to have the same IP address or different IP address or how is it going to work work okay let's think about this this is how
28:31
28 minutes, 31 seconds
it actually works this is your internet service provider okay mine is AEL for example
28:38
28 minutes, 38 seconds
Okay Internet service provider okay your internet service provider gives you a modem or something okay your
28:47
28 minutes, 47 seconds
modem and router or whatever okay this is going to have a
28:53
28 minutes, 53 seconds
global IP address all the devices connected to this Wi-Fi
29:02
29 minutes, 2 seconds
modem are going to have the same IP address for everywhere around the
29:09
29 minutes, 9 seconds
world okay inside this modem device one may be connected device 2 may be connected and device 3 may be
29:18
29 minutes, 18 seconds
connected so the modem will give IP addresses to these as well
29:30
29 minutes, 30 seconds
okay these are known as local IP addresses okay these are known as local
29:40
29 minutes, 40 seconds
IP addresses how does it do it DHCP Dynamic
29:47
29 minutes, 47 seconds
host configuration protocol this is also a set of rules and regulations only I will talk to you about DCP as well in like in the later of this courses right
29:55
29 minutes, 55 seconds
now I'm just setting the stage taking my time and just setting the stage we'll cover it in detail so modem and it allow
30:03
30 minutes, 3 seconds
it assigns these IP addresses using DHCP protocol okay that's basically about
30:14
30 minutes, 14 seconds
it okay so this is a global IP address so if anyone wants to if you make a request to google.com Google will
30:22
30 minutes, 22 seconds
actually see This Global IP address so if this device one makes a request or device two makes a request request for Google it will only be like
30:30
30 minutes, 30 seconds
okay this one single device is making a request
30:37
30 minutes, 37 seconds
okay cool okay and when the request comes
30:46
30 minutes, 46 seconds
back from Google so this is connected to the internet I'll talk about how isps work
30:54
30 minutes, 54 seconds
and everything later on so you send a request to Google your ISP will send a request to google.com Okay it will return back the
31:04
31 minutes, 4 seconds
request okay now this modem will decide the router will decide who was the one who had the
31:11
31 minutes, 11 seconds
request was it device one device two device 3 it does that using natat Okay network access
31:22
31 minutes, 22 seconds
translator I wrote it down over here somewhere yeah okay so like hey device one had
31:31
31 minutes, 31 seconds
Google Chrome open on its Tab and uh that is the something that requested
31:38
31 minutes, 38 seconds
this okay sound good
31:47
31 minutes, 47 seconds
cool okay but now modem and router is like okay I know device one was the one
31:54
31 minutes, 54 seconds
that made a request but which application in device one made the request how do we figure that
32:01
32 minutes, 1 second
out you're running let's say mongodb you make some request and you want data to be get got you want the data to be back in
32:09
32 minutes, 9 seconds
mongodb or you're running your own server on your system you make a request to the internet and the data when it comes you want it to come to your own
32:17
32 minutes, 17 seconds
server or application whatever you're running you're gaming some for example you're gaming you're chatting to someone
32:24
32 minutes, 24 seconds
in an online game that is installed on your computer you send request to the internet the internet gives back the message of your friend and now your
32:32
32 minutes, 32 seconds
router is like okay I know it's it needs to be sent to kunal's device but how do I know where do I need to send this message do I send to the game or the
32:41
32 minutes, 41 seconds
browser or whatever where do I send it so IP address is a very important Point IP address decides which device to send
32:50
32 minutes, 50 seconds
the data but how do we decide which application to send the data in that device
32:58
32 minutes, 58 seconds
we that we do that using ports okay because one single computer can be running many internet
33:07
33 minutes, 7 seconds
applications and when the internet sends the data to that computer the computer has to decide okay fine I have gotten the data but which application requested
33:15
33 minutes, 15 seconds
this data you do you make a you make the you know all the all these will be
33:23
33 minutes, 23 seconds
having obviously the same IP address because they're on the same device okay but how do these applications differ using port
33:31
33 minutes, 31 seconds
numbers okay that is basically what a port number is so if you're talk if you're talking to your friend using uh you know
33:40
33 minutes, 40 seconds
some some application some chat application or something so you will be having an IP address you you and your
33:46
33 minutes, 46 seconds
friend you and your friend are talking to each other okay you will have an IP address
33:55
33 minutes, 55 seconds
and you will have a port number your friend will also have an IP address and a port number IP address will determine
34:02
34 minutes, 2 seconds
where your computers are located port number will be denoting which application you are using to
34:11
34 minutes, 11 seconds
communicate okay so IP address will identify the computer but Port will be identifying the
34:20
34 minutes, 20 seconds
application okay cool let's talk a little bit about about ports okay so ports are are basically 16
Chapter 6: Port Numbers
34:28
34 minutes, 28 seconds
bit numbers okay uh if you don't know what bits are check out the mathematics uh video I did in the data algorithms boot
34:36
34 minutes, 36 seconds
camp there I have covered in detail uh number Theory and everything so 16bit means what if a port number is a 16bit
34:44
34 minutes, 44 seconds
number so 16bit basically means you can have 16 cells um and each every cell can contain
34:54
34 minutes, 54 seconds
what zero or one so how many total numbers can you create 2 to^
35:02
35 minutes, 2 seconds
16 okay so total port numbers that are possible are 2 to^
35:09
35 minutes, 9 seconds
16 just something around 65,000 okay something around 65,000 port
35:17
35 minutes, 17 seconds
numbers uh are available okay sound good we know that web pages
35:26
35 minutes, 26 seconds
are using which particular uh protocol HTTP don't worry how it's using it I'm just telling you I'm asking what
35:33
35 minutes, 33 seconds
is it using how it's working everything I'll cover later on okay so we know web pages are using HTTP okay
35:42
35 minutes, 42 seconds
so there should be some sort of port number defined for it if you're browsing on the web you say google.com request is sent to Google Google sends the request
35:51
35 minutes, 51 seconds
back now your request is on your device but it does not know where to send it do I send it to the web browser do I send it to the email do I send it to some
35:59
35 minutes, 59 seconds
game you're playing where do I send it for that a port is defined so all the HTTP stuff that you do that will happen
36:08
36 minutes, 8 seconds
on Port at it's well defined these are
36:17
36 minutes, 17 seconds
well-known ports okay it's defined by people all
36:25
36 minutes, 25 seconds
right sound good if you are running mongod DB okay DB I believe the port for
36:34
36 minutes, 34 seconds
this is 27017 correct me if I'm wrong I'm not sure okay so ports that are from zero
36:42
36 minutes, 42 seconds
till uh one23 these are reserved ports what do we mean by reserved ports
36:51
36 minutes, 51 seconds
reserved Port means that if you have your own application created you created your own application and you're like hey
36:58
36 minutes, 58 seconds
I will host my application on Port at you can't do that it's already reserved for HTTP
37:09
37 minutes, 9 seconds
stuff okay sound good port number 1024
37:18
37 minutes, 18 seconds
till something like 49 152 they are also registered but they are registered for applications some
37:27
37 minutes, 27 seconds
some some specific applications like mongodb my SQL okay so SQL has every SQL
37:35
37 minutes, 35 seconds
Server that you run on your applic on your system it has a port of 1433 port
37:43
37 minutes, 43 seconds
number okay the remaining ones you can use
38:00
38 minutes
okay sound good remaining you can use okay that's basically about it but we'll
38:09
38 minutes, 9 seconds
dive deep into it as well so this was just basic stuff right now we'll obviously dive deep into everything okay so when we talk about like the internet
38:17
38 minutes, 17 seconds
you you have your own like computer over here let's say okay your friend has a computer in some other other country and you're
38:25
38 minutes, 25 seconds
connected somehow okay say internet this is a
38:35
38 minutes, 35 seconds
cloud okay so you all are connected like these you know big big things on the initial scale you're connected with your
38:42
38 minutes, 42 seconds
internet service provider ISP so an ISP is a person that connects you with the entire of the internet a company or whatever like I'm using A10 okay but
38:52
38 minutes, 52 seconds
before we dive into it let's talk a little bit more about like how do we measure it right so when when we say that what is the speed of your internet
39:00
39 minutes
service provider like I'm like 350 Mbps or whatever write that okay so what do we mean by this what do we mean by if
39:08
39 minutes, 8 seconds
your speed is let's say 1 Mbps Mbps what is it what does it mean it's very
39:17
39 minutes, 17 seconds
simple what what is the full form of MVPs is it megabytes per second no it's meab bits per second bits bit one single
39:27
39 minutes, 27 seconds
bit is 0 or 1 okay so 1 Mbps means 1 megabits you can transfer per
39:35
39 minutes, 35 seconds
second Mega means one with six zeros so
39:40
39 minutes, 40 seconds
1 1 2 3 4 5 6 bits per second can be
39:48
39 minutes, 48 seconds
transferred 1 gbps is what 9 bits 10 to power 9 bits
40:00
40 minutes
per second 1 kbps is what 10 to
40:06
40 minutes, 6 seconds
power what KB means th000 yeah 1,000 bits per second very small very
40:18
40 minutes, 18 seconds
slow Okay cool so when you when you send the
40:26
40 minutes, 26 seconds
data okay so you send the data back you send the data from one computer to another
40:35
40 minutes, 35 seconds
computer let's talk about you you are sending data from one computer to another computer that is known as upload when someone sends data to you and
40:43
40 minutes, 43 seconds
you're downloading that called download okay the download speed upload speed that's basically what it's
40:54
40 minutes, 54 seconds
about okay so check it out uh you can check out ukla speed test or whatever random speed tests and you can check out
41:02
41 minutes, 2 seconds
your internet speed okay so now let's talk about let's start talking about because it's such a complex topic I don't want to rush into it because
41:10
41 minutes, 10 seconds
people are like I don't understand OSI model or whatever and how it's actually linking towards one another so that's why I'm building it up okay now let's
41:17
41 minutes, 17 seconds
talk about how does this thing happens how does the communication between two computers and things like this happen there are two ways via which it happens
41:26
41 minutes, 26 seconds
okay one is the guided way and one another one is the unguided way guided
41:33
41 minutes, 33 seconds
way means what guided way means like uh there's a set of path already defined for example for example two computers
41:42
41 minutes, 42 seconds
are connected with a wire that's the guided way what is the unguided way uh communication is happening but there's no like one single path for example
41:51
41 minutes, 51 seconds
Wi-Fi Bluetooth okay internet when I am
41:57
41 minutes, 57 seconds
talking to someone from the UK okay I send the request to like my ISP ISP sends it to UK UK gives it back okay how
42:06
42 minutes, 6 seconds
are our countries connected so on the minute details how it happens I look into later on now
42:13
42 minutes, 13 seconds
let's look into how the bigger picture happens how are countries connected with one another okay because it's super fast
42:21
42 minutes, 21 seconds
this transmission and everything that happens it's super fast how this is how it's actually a website that
Chapter 7: Submarine Cables Map (Optical Fibre Cables)
42:30
42 minutes, 30 seconds
you can go to submarine cable.com so literally they have uh they have wires running across the
42:38
42 minutes, 38 seconds
ocean from one country to another wires are running down the ocean
42:45
42 minutes, 45 seconds
so you can see in India India fromwhere from Chennai
42:52
42 minutes, 52 seconds
coochin and uh yeah somewhere from the south you can see we are connected to Sri Lanka and uh this is uh Mumbai so
43:02
43 minutes, 2 seconds
from Mumbai we are connected to like Dubai Oman UAE and we're also connected to I believe somewhere in Singapore so
43:11
43 minutes, 11 seconds
we're connected to Malaysia and stuff and that's how it sort of like works okay so there's like a big
43:20
43 minutes, 20 seconds
um you know entity in like countries that controls this big stuff in India I believe it's startup I could be wrong but you can this is
43:28
43 minutes, 28 seconds
something this information you can find online who controls it from India and then they the bigger entity they give it to like smaller entities and then they
43:37
43 minutes, 37 seconds
give it to internet service providers and internet service providers give the control to us that's how it works on a larger scale
43:45
43 minutes, 45 seconds
so this is literally inside like uh inside the ocean here you can
43:54
43 minutes, 54 seconds
see some Marine cables are inside the ocean this is one of the cable it's from Spain
44:04
44 minutes, 4 seconds
UK and the United States
44:09
44 minutes, 9 seconds
cool easy SW let look one in India over here let's check this
44:21
44 minutes, 21 seconds
one okay 28,000 kilom is the length of this cable it's running from a lot of
44:30
44 minutes, 30 seconds
places wow Japan South Korea and China and
44:37
44 minutes, 37 seconds
Malaysia India UAE Israel um Italy
44:46
44 minutes, 46 seconds
and UK one single wire spread across continents how fascinating is this you
44:54
44 minutes, 54 seconds
can see this as well submarine
45:00
45 minutes
cables this is how it's inside the water so internet is not like above
45:08
45 minutes, 8 seconds
above us it's actually under the ocean this is basically the somebody in cable Google also owns a
45:16
45 minutes, 16 seconds
lot of this right uh Google has its own like search engine and whatever they own a lot of such cables right so Google is
45:23
45 minutes, 23 seconds
like also pretty pretty famous in this they have have like a lot of cables underground some people askal don't sharks or something you know they cut
45:32
45 minutes, 32 seconds
this cable or fish fishes don't they cut these cables um no they don't because it's actually very heavily guarded okay
45:39
45 minutes, 39 seconds
and it's actually I believe buried on the ocean floor so animals can't get to it okay so if you want to learn more about it you can um how the you know
45:48
45 minutes, 48 seconds
data is uh like how computers get connected so physically they get connected in this way you know you can look at like your
45:58
45 minutes, 58 seconds
optical fiber cables for example optical fiber cables okay how these things work and
46:07
46 minutes, 7 seconds
all these other things coaxial cable coaxial cables or whatever okay you can take a look into
46:17
46 minutes, 17 seconds
this other than that this is the wireless one so in the wireless we are already familiar with
46:25
46 minutes, 25 seconds
it what is the wireless stuff Wireless stuff consists of
46:32
46 minutes, 32 seconds
um like radio channels for example right so I'm talking about uh example Bluetooth which is for short
46:41
46 minutes, 41 seconds
range Bluetooth is there then we have Wi-Fi okay and if you want to talk about
46:49
46 minutes, 49 seconds
like longer ranges for that we have like 3G 4G like LTE now we have 5G also something like
46:59
46 minutes, 59 seconds
that okay so that's basically about it now you'll be like why do you have why do we have these you know why can't we
47:07
47 minutes, 7 seconds
just use satellites why do we have to put cables under the ocean so many long long cables across the world because
47:13
47 minutes, 13 seconds
it's faster than satellite okay currently also there isn't like I haven't given you the actual feeling of
47:21
47 minutes, 21 seconds
how the internet thing you know actually works how how the protocols happen and what are various stages and the all the
47:29
47 minutes, 29 seconds
things that I mentioned like you will have your Global IP and you know you will get the request and it will transfer it to your local computer and
47:37
47 minutes, 37 seconds
then it will transfer it to your application or whatever so how these things happen internally we haven't covered it yet we will cover it later on in this video itself when we talk about
47:45
47 minutes, 45 seconds
the OSI model okay so there are some layers in the OSI model and we'll cover every single layer in detail before that I want to give you a refresher on what
47:53
47 minutes, 53 seconds
we learned in high school okay in high school we learned a little bit about computer okay so I just told you how countries are connected let's do a little bit of a
Chapter 8: LAN, MAN, WAN
48:01
48 minutes, 1 second
refresher of how various things are connected okay so we know there's something known as a local area network
48:09
48 minutes, 9 seconds
Lan okay so we know there's a local area network I'm just writing down pointers you can Google it like uh like yourself
48:17
48 minutes, 17 seconds
what is this small uh house for a small house or office if you have like some devices connected that is known as local
48:25
48 minutes, 25 seconds
area network Okay small here does not mean that there's only five computers you can connect or 10 computers you can connect
48:33
48 minutes, 33 seconds
okay you you can even come you can you connect 10,000 computers if you want okay but it just basically means it's like in an
48:42
48 minutes, 42 seconds
area Okay Okay cool so that's basically it and uh let's also look at some of the
48:50
48 minutes, 50 seconds
concepts of like Lan or how how these computers let's say connected it's very general knowledge we have worked with this before
48:57
48 minutes, 57 seconds
um you have uh if you have game you know gamed with your people like folks before you can connect it VI ethernet okay so
49:05
49 minutes, 5 seconds
how by ethernet ethernet cable right they're like network
49:13
49 minutes, 13 seconds
adapters and ethernet switches because there are so many ways to connect to the outside world uh via Wi-Fi via like Bluetooth via Ethernet or whatever there
49:22
49 minutes, 22 seconds
needs to be some sort of a device to manage this that's known as a like a network adapter like network card s for example okay or how you can connect on a
49:30
49 minutes, 30 seconds
local area Wi-Fi also yeah Wi-Fi works you can connect by Wi-Fi also
49:38
49 minutes, 38 seconds
okay now in high school we also learned about man metropolitan area network which is across the city it's very
49:46
49 minutes, 46 seconds
simple stuff across a city okay I'll cover in detail how ISP
49:54
49 minutes, 54 seconds
helps us in you know connecting us to the internet internet service providers okay then there's a wide area
50:03
50 minutes, 3 seconds
network okay of across countries for example
50:13
50 minutes, 13 seconds
okay cool all right so wide area network basically allows you know for you to
50:21
50 minutes, 21 seconds
connect over countries okay typically using optical fiber cables
50:30
50 minutes, 30 seconds
optical fiber cables okay so we all learned about this
50:41
50 minutes, 41 seconds
in the in high school but how does it relate to the Internet so internet is actually a collection of all these
50:50
50 minutes, 50 seconds
three a lot of local area networks that are connected to each other using Metropolitan networks that are connected
50:58
50 minutes, 58 seconds
to each other using wide area network
51:08
51 minutes, 8 seconds
okay so this wide area network there are two more things I want to mention over here one is known as
51:18
51 minutes, 18 seconds
Sonet okay Sonet basically means Synchro uh synchronous Optical networking
51:28
51 minutes, 28 seconds
okay so it basically carries the data uh using optical fiber cables hence
51:35
51 minutes, 35 seconds
it can cover larger distances second one is frame
51:44
51 minutes, 44 seconds
relay now what is frame relay it's basically a W for you to connect your local area network to The Wider area
51:52
51 minutes, 52 seconds
like the internet okay so that was about it okay let's talk a
52:01
52 minutes, 1 second
little bit more about this thing in detail a little bit more terms before we move forward to how the internal implementation and everything is done
52:08
52 minutes, 8 seconds
okay right now also we have learned a lot of terms and I'm writing it down over here the video is recorded I'll be adding time stamps so you can add on it
52:17
52 minutes, 17 seconds
add on to it like come back revisit and whatever so when I talk about modems and stuff okay what is a modem when I talk
Chapter 9: MODEM, ROUTER
52:25
52 minutes, 25 seconds
about router what is router router so a modem is basically used to convert digital signals into analog
52:33
52 minutes, 33 seconds
signals and vice versa okay for example the Digital Data
52:40
52 minutes, 40 seconds
that you have on your computer a modem can convert that into an electrical signal so that you can transfer it over let's say some telephone lines or some
52:49
52 minutes, 49 seconds
other uh you know uh other modem at the receiving site for example and that will recover the Digital Data like an
52:59
52 minutes, 59 seconds
image okay sound good or and a router is basically a device that routes the data
53:06
53 minutes, 6 seconds
packets the packet thing we talked about right based on their IP addresses okay when we talk about OSI
53:14
53 minutes, 14 seconds
model we'll know that it works on the network layer and uh they connected to like the the lands that we just talked about in the B area
53:23
53 minutes, 23 seconds
networks okay so how this data is rooted and everything what is a packet what is consistent inside a packet and
53:30
53 minutes, 30 seconds
everything I'll cover shortly okay but uh what we're trying to say over here is that uh like for now that is what you
53:38
53 minutes, 38 seconds
need to take into consideration we talk about modem okay cool we already talked about
53:45
53 minutes, 45 seconds
like how the client and server model works and everything so we talked about like what modems and routers and these all devices and stuff we'll cover later
53:53
53 minutes, 53 seconds
when we talk about OSI model and everything okay so the client server model we know uh client makes a request server will send a response we had a you
54:01
54 minutes, 1 second
know uh we had it written over here somewhere right okay cool um we talked
54:09
54 minutes, 9 seconds
about IP addresses a little bit right we talked about uh what are an IP what is an IP address and it sort of like
54:17
54 minutes, 17 seconds
resolves you know uh it's like a phone book phone book of the internet if you will okay and um we can basically
54:24
54 minutes, 24 seconds
remember the domain name and it will uh point to the computer or a server of that IP address okay one more thing I
54:31
54 minutes, 31 seconds
talked to you about was internet service provider okay so internet service providers are companies that provide us access to the internet okay so internet
54:41
54 minutes, 41 seconds
service providers are basically connected to larger internet service providers that provide service to them like I mentioned
54:49
54 minutes, 49 seconds
previously okay so in India the the top level you know uh they are like top level is internet service providers in
54:57
54 minutes, 57 seconds
the world and there are only a few these are known as Tire one or tier one um internet service providers uh in India
55:05
55 minutes, 5 seconds
we have the tier one service provider Tata okay tier 2 internet service provider can be like airel or
55:13
55 minutes, 13 seconds
whatever okay so there's a long cable from Chennai uh for Tata in like Chennai to Singapore and
55:22
55 minutes, 22 seconds
stuff okay so repeated it multiple times hence you should not get uh not get confused
55:30
55 minutes, 30 seconds
and um yeah on a bigger picture that's basically about it cool let's move
55:38
55 minutes, 38 seconds
forward okay now one more thing we studied in uh in high school which is also very basic stuff which is uh how computers are connected various ways
55:46
55 minutes, 46 seconds
they are connected right so topologies you have studied this in high school as well
Chapter 10: Topologies (BUS, RING, STAR, TREE, MESH)
55:54
55 minutes, 54 seconds
topologies just a little bit of Rev don't want to leave out anything Canal you left out this thing you left out that thing or whatever okay so the
56:03
56 minutes, 3 seconds
number one topology very simple one everyone knows this bus topology okay so every system in the bus
56:11
56 minutes, 11 seconds
topology it's like connected to one like a cord or like a backbone okay for example so here we can have let's say a
56:19
56 minutes, 19 seconds
a backbone is like this and computers are connected to it like this computers are connected this is bus
56:27
56 minutes, 27 seconds
topology okay but what is the problem here it's very simple if if this gets broken this link gets broken then uh it will like
56:36
56 minutes, 36 seconds
U spoil the entire network okay and also since everything
56:43
56 minutes, 43 seconds
is being transmitted via this cable this one over here um only one person can send data at a particular
56:51
56 minutes, 51 seconds
time okay so this is the bus topology this is sometimes how computers are
56:58
56 minutes, 58 seconds
connected okay second one is also pretty simple which is known as uh ring
57:05
57 minutes, 5 seconds
topology ring so as the name suggests computers are connected in a ring with one another okay so in this for example you
57:14
57 minutes, 14 seconds
want to send data from here to here it's very simple it will go via this wire okay but in ring topology what is
57:21
57 minutes, 21 seconds
happening is that every system communicates with one another okay so if Target from let's say
57:30
57 minutes, 30 seconds
computer a to computer F or something like that it would have to go through computer B and computer C
57:39
57 minutes, 39 seconds
also okay
57:49
57 minutes, 49 seconds
cool but what are the limitations here now one more limitation here is if one of the cables break then that's it you
57:58
57 minutes, 58 seconds
won't be able to transfer data uh what is the second limitation a lot of lot of unnecessary
58:06
58 minutes, 6 seconds
like you know um calls are being made so if you want to send data from a to F it's making calls to B and C also so
58:14
58 minutes, 14 seconds
that's also not good right that's that's a limitation all right cool let's talk
58:23
58 minutes, 23 seconds
about another one another topology how are other computers are connected star topology okay so what is the star
58:31
58 minutes, 31 seconds
topology there there is one controlling device one Central device that is connected to all the
58:39
58 minutes, 39 seconds
computers all computers are connected to that only if computer a wants to send something to computer
58:48
58 minutes, 48 seconds
B then um it will just communicate via this device over here this is a centralized
58:55
58 minutes, 55 seconds
device cool what are some of the limitations if the central device
59:03
59 minutes, 3 seconds
fails then computer system will go down your network will go down
59:12
59 minutes, 12 seconds
okay there's another one fourth one what is the fourth one tree
59:21
59 minutes, 21 seconds
topology it's sort of like a combination of bus and star topology
59:29
59 minutes, 29 seconds
okay so some some some star networks connected like a bus so bus basically contains one single one like this and
59:39
59 minutes, 39 seconds
every single one can have like itself a star topology computer computer
59:47
59 minutes, 47 seconds
computer centralized device computer computer computer so many many Star are
59:55
59 minutes, 55 seconds
connected in a bus sort of a m okay so little bit has little bit more
1:00:02
1 hour, 2 seconds
fall tolerance and everything number five
1:00:10
1 hour, 10 seconds
mesh okay so mesh is basically something that uh every single computer will be connected to every single
1:00:18
1 hour, 18 seconds
computer okay so every single
1:00:33
1 hour, 33 seconds
computer is connected to every single computer what are the limitations it's expensive so much wire being
1:00:43
1 hour, 43 seconds
used okay if you want to add one more computer then you'd have to connect that computer with every single computer so
1:00:51
1 hour, 51 seconds
scalability issues right that's it
1:01:04
1 hour, 1 minute, 4 seconds
yeah okay so this was about topologies okay now basic stuff are done and now
1:01:11
1 hour, 1 minute, 11 seconds
let's talk about the main stuff um which is also extremely important a lot of terms I'll be sharing over here that are going to be useful during the you know
1:01:20
1 hour, 1 minute, 20 seconds
devops boot camp like you know like DNS IP addresses cookies uh OSI model model and all these other things okay now this
1:01:28
1 hour, 1 minute, 28 seconds
is a new new like segment of this uh course now we're talking about the network in uh like the structure of the
Chapter 11: Structure of the Network
1:01:36
1 hour, 1 minute, 36 seconds
network basically okay so structure of network we'll talk about the OSI model let's talk about the structure of
1:01:45
1 hour, 1 minute, 45 seconds
network how things work internally what are all the processes involved and so many other things like protocols how
1:01:52
1 hour, 1 minute, 52 seconds
everything works internally what does it look like see that as well structure of
1:01:59
1 hour, 1 minute, 59 seconds
the network let's imagine it with a real world scenario because I mentioned
1:02:06
1 hour, 2 minutes, 6 seconds
initially I'll do that internet is very complex okay we all know that so it would make sense to break it down into
1:02:13
1 hour, 2 minutes, 13 seconds
smaller pieces okay so how can we break it down into smaller pieces let's see
1:02:21
1 hour, 2 minutes, 21 seconds
you you order some food okay you order some thing you order
1:02:29
1 hour, 2 minutes, 29 seconds
food okay to the restaurant you call the restaurant or you order it on your app and the restaurant gets your order very
1:02:39
1 hour, 2 minutes, 39 seconds
simple right now you given the order to the restaurant the restaurant will uh
1:02:46
1 hour, 2 minutes, 46 seconds
they will like you know um take your order and prepare your order okay so restaurant will take your order and they
1:02:55
1 hour, 2 minutes, 55 seconds
will then prepare your order for example okay and then they will sort of like let's
1:03:04
1 hour, 3 minutes, 4 seconds
say um you know send it to the Delivery Agent okay a restaurant example is
1:03:13
1 hour, 3 minutes, 13 seconds
actually a bit complicated um let's say we talk about Amazon okay so you order something
1:03:21
1 hour, 3 minutes, 21 seconds
online okay you order something online make sense you give it to Amazon and
1:03:29
1 hour, 3 minutes, 29 seconds
Amazon will be like okay we got it and Amazon will take care of
1:03:36
1 hour, 3 minutes, 36 seconds
it okay then Amazon is like okay we have got your order and now Amazon will ship
1:03:42
1 hour, 3 minutes, 42 seconds
your order to your local delivery agent okay your delivery
1:03:51
1 hour, 3 minutes, 51 seconds
company delivery company let's say if you're ordering is coming from the United States so it will be having delivery company from the United States
1:04:00
1 hour, 4 minutes
from there your order will be sent out then your order will be
1:04:07
1 hour, 4 minutes, 7 seconds
transported transported okay now your order has arrived in
1:04:15
1 hour, 4 minutes, 15 seconds
India your order has arrived in India it will again be transported to the delivery company
1:04:22
1 hour, 4 minutes, 22 seconds
responsible right to the delivery company that is responsible over here
1:04:30
1 hour, 4 minutes, 30 seconds
delivery company or whatever okay and that delivery company in turns will then provide it to Amazon
1:04:37
1 hour, 4 minutes, 37 seconds
like hey Amazon um the package is going to be delivered or whatever you can deliver it so let's let's imagine Amazon is like directly delivering it and this
1:04:45
1 hour, 4 minutes, 45 seconds
company is only for Country wise country wise distribution okay then you get your
1:04:52
1 hour, 4 minutes, 52 seconds
Amazon from order received okay this is the internet this is how we
1:04:59
1 hour, 4 minutes, 59 seconds
can imagine the internet so basically you request some files you request let's say a video from YouTube a movie or
1:05:08
1 hour, 5 minutes, 8 seconds
something right you can you can do that and YouTube will take care of it YouTube is going to be like okay this is what you want let me see how we can do it it
1:05:16
1 hour, 5 minutes, 16 seconds
is going to prepare all the data and it will give it to you in terms of transportation from its server then it will reach the server in your country it
1:05:24
1 hour, 5 minutes, 24 seconds
will be like okay this is all everything and now it's received to you
1:05:31
1 hour, 5 minutes, 31 seconds
okay so this is basically what we are trying to do this layer where you get the order and everything this is the
1:05:40
1 hour, 5 minutes, 40 seconds
application layer from which you are
1:05:48
1 hour, 5 minutes, 48 seconds
interacting the very first so application layer can be like your WhatsApp Messenger it's an application
1:05:55
1 hour, 5 minutes, 55 seconds
inter internally how this complex thing is working do you really know no we don't know all we know is how to use the application
1:06:04
1 hour, 6 minutes, 4 seconds
WhatsApp okay so this was a general analogy now let's look into the details of it let's look into how this thing works how the internet works this is the
1:06:12
1 hour, 6 minutes, 12 seconds
main part OSI model very important part this is how
1:06:19
1 hour, 6 minutes, 19 seconds
the internet works main part this transportation of data you send a message and the message is received to
1:06:26
1 hour, 6 minutes, 26 seconds
your friend this this part is the internet okay let's see how it happens
Chapter 12: OSI Model (7 Layers)
1:06:35
1 hour, 6 minutes, 35 seconds
okay so let's talk about how it works how the internet works okay so the OSI model stands for open systems
1:06:42
1 hour, 6 minutes, 42 seconds
interconnection model okay so the idea is that um it it was developed uh so
1:06:49
1 hour, 6 minutes, 49 seconds
that uh you know uh there was like a standard way uh of about how two let's
1:06:57
1 hour, 6 minutes, 57 seconds
say two or more computers communicate with each other okay s good so it's just like it's
1:07:05
1 hour, 7 minutes, 5 seconds
a it's a standard for how people and how servers or whatever communicate with each other okay so there are a few
1:07:13
1 hour, 7 minutes, 13 seconds
layers in this OSI model internet is very complex a lot of things happen Okay so right from checking out an application and a messenger sending an
1:07:22
1 hour, 7 minutes, 22 seconds
application sending a message that that message will be you know uh sent to your isps or whatever and then it will be sent to your friend in
1:07:29
1 hour, 7 minutes, 29 seconds
another country and then it will determine which where your friend is which device which application very complex let's divide it into
1:07:37
1 hour, 7 minutes, 37 seconds
steps okay so there are seven layers in the USI model how many layers seven layers first is the application
1:07:45
1 hour, 7 minutes, 45 seconds
layer I'll go into details of every single layer but right now let's look at the overview then we will check at check
1:07:52
1 hour, 7 minutes, 52 seconds
out every single layer independently okay application
1:07:59
1 hour, 7 minutes, 59 seconds
layer presentation layer third one is session
1:08:08
1 hour, 8 minutes, 8 seconds
layer transport layer Network
1:08:15
1 hour, 8 minutes, 15 seconds
layer data link layer and then at the last physical layer OSI model is the most important topic for interviews they
1:08:25
1 hour, 8 minutes, 25 seconds
ask you ask you in many many interviews my friend was asked about it in the in his Facebook interview so OSI model is extremely important please take care of
1:08:33
1 hour, 8 minutes, 33 seconds
it okay so here are seven layers of OSI model every single layer will have like different like you know protocols and things and devices and everything being
1:08:42
1 hour, 8 minutes, 42 seconds
used which we'll cover into in details okay so in detail we're going to cover this thing let's look into the abstract
1:08:50
1 hour, 8 minutes, 50 seconds
of it first just like in simple terms let's look into it okay then we'll look at every layer in detail first one is the application layer okay let's talk
1:08:58
1 hour, 8 minutes, 58 seconds
about the application layer what is the application I don't feel like writing I'm just dictating you can write the notes on your own okay so application
1:09:08
1 hour, 9 minutes, 8 seconds
layer basically it's implemented in what software it's implemented in
1:09:15
1 hour, 9 minutes, 15 seconds
software as the name suggests it's an application so the folks who are the users they will interact with their application send messages files or
1:09:24
1 hour, 9 minutes, 24 seconds
emails or whatever application layer contains the applications okay like browsers and messaging applications and so on and so
1:09:33
1 hour, 9 minutes, 33 seconds
forth okay so you send your data over from application
1:09:40
1 hour, 9 minutes, 40 seconds
layer to presentation layer you sent a message that message was sent to presentation layer
1:09:48
1 hour, 9 minutes, 48 seconds
now okay now what is the idea of presentation layer so the the
1:09:55
1 hour, 9 minutes, 55 seconds
presentation layer basically uh so in the application layer when I talk about like having software systems or you know like like Network applications and stuff
1:10:03
1 hour, 10 minutes, 3 seconds
like a Skype or Chrome or or whatever so obviously application layer protocols have some you know application layer
1:10:10
1 hour, 10 minutes, 10 seconds
protocols like uh like HTTP and like file transfer protocol so on and so forth tnet I'll talk more about these
1:10:17
1 hour, 10 minutes, 17 seconds
protocols later on okay in detail okay and DNS and everything we we'll talk more about that later for now just focus on the above thing so it will have your
1:10:25
1 hour, 10 minutes, 25 seconds
data it will give the data to presentation layer like hey presentation layer take this data presentation layer will take the data whatever your message you're trying to send to your friend in
1:10:34
1 hour, 10 minutes, 34 seconds
another country it will get the data from the application layer and this data will be in form of what like words and characters and letters and numbers and
1:10:42
1 hour, 10 minutes, 42 seconds
so on and so forth right so the presentation layer is going to convert these characters and stuff into machine
1:10:50
1 hour, 10 minutes, 50 seconds
representable binary format okay from asky to something like ebcd
1:10:57
1 hour, 10 minutes, 57 seconds
I okay this is known as translation okay a few more things
1:11:05
1 hour, 11 minutes, 5 seconds
happen for example before the data is transmitted further it goes under like encoding like I me I just mentioned
1:11:12
1 hour, 11 minutes, 12 seconds
encoding encryption okay so changing the data so that it's only readable to the
1:11:18
1 hour, 11 minutes, 18 seconds
person that the data was sent to okay that thing is happening over here how this happens internally can like okay
1:11:26
1 hour, 11 minutes, 26 seconds
you're saying data is encrypted then how does my friend know how to encrypt or decrypt it or whatever no don't worry about that I'll cover that later on when
1:11:35
1 hour, 11 minutes, 35 seconds
we directly just talk about presentation layer right now in this module we are learning what every layer does how it does it I'll check out uh I I'll share
1:11:44
1 hour, 11 minutes, 44 seconds
with you later on okay so it encrypts the data it also provides abstraction okay it also provides
1:11:52
1 hour, 11 minutes, 52 seconds
abstraction so basically uh it abstraction I've converted in object progamming but this presentation layer
1:12:00
1 hour, 12 minutes
uh is basically going to assume that uh if I send the data downwards okay then it will take care of
1:12:09
1 hour, 12 minutes, 9 seconds
it okay the data over here is also compressed so that it's easier to transport over like large and like
1:12:16
1 hour, 12 minutes, 16 seconds
reduce the traffic and everything so data is also compressed this can be lossy or lossless it depends um but like
1:12:24
1 hour, 12 minutes, 24 seconds
uh yeah so we talked about encryption compression translation right
1:12:32
1 hour, 12 minutes, 32 seconds
cool sound good here SSL protocol is used SSL we'll talk more about like later secure
1:12:40
1 hour, 12 minutes, 40 seconds
sockets layer for encryption and description decryption okay so SSL what is it what are these HTTP tet or so many
1:12:48
1 hour, 12 minutes, 48 seconds
terms you mentioned what are these protocols right now just think of it as protocol right now just focus on what these layers are doing okay then your
1:12:56
1 hour, 12 minutes, 56 seconds
data is sent to session layer okay okay so then your data is sent to session layer now the session
1:13:03
1 hour, 13 minutes, 3 seconds
layer protocol basically helps in setting up and managing the connections and it enables you know like the sending
1:13:10
1 hour, 13 minutes, 10 seconds
and receiving of data followed by termination of the connected sessions okay so before a session is
1:13:19
1 hour, 13 minutes, 19 seconds
established it will do some sort of authentication and stuff server you know many times it asks for username and and password that happens quite a lot of
1:13:27
1 hour, 13 minutes, 27 seconds
times that is known as like authentication okay and then authorization takes place so whether you have permission to access the file on a
1:13:35
1 hour, 13 minutes, 35 seconds
server or not that depends okay sound good okay so with the session
1:13:43
1 hour, 13 minutes, 43 seconds
layer also this is like the similar stuff session layer assumes that the layers below it will do their work session layer assumes that there's a
1:13:52
1 hour, 13 minutes, 52 seconds
layer let's say transport layer below it and it will be like okay if I just establish a session the data Transportation will be done by the
1:13:59
1 hour, 13 minutes, 59 seconds
transport layer it assumes it so session layers work is this thing okay maintaining for one more example can be
1:14:06
1 hour, 14 minutes, 6 seconds
when you're shopping from flipcart or amazon.com okay there's a session being created for your computer and the flip
1:14:14
1 hour, 14 minutes, 14 seconds
cart server or whatever okay and when everything happens it logs you out and payment is done that's basically the
1:14:21
1 hour, 14 minutes, 21 seconds
idea of session layer okay how it works internally we'll we'll obviously look uh look into like later on the data packets
1:14:29
1 hour, 14 minutes, 29 seconds
are used and everything is used so on and so forth okay cool next is the transport layer so data is transferred
1:14:37
1 hour, 14 minutes, 37 seconds
from session layer to transport layer now transport layer basically it's like okay transport is going to hey application layer got some data and then
1:14:45
1 hour, 14 minutes, 45 seconds
it presented that data then the session was established and now it's my part to work with this data and make sure it's
1:14:52
1 hour, 14 minutes, 52 seconds
transported to the friend easily okay so it has its own like protocol of how data will be transferred like UDP
1:15:00
1 hour, 15 minutes
and TCP after this overview I'll tell you a little bit more about protocols okay so Protocols are nothing but how data is transferred okay so it does it
1:15:09
1 hour, 15 minutes, 9 seconds
in three way there's one part known as segmentation so data that is received from the session layer it will be divided into small data units called
1:15:18
1 hour, 15 minutes, 18 seconds
segments okay and we talked about port numbers right so every segment will contain the source and the destination port number number and a sequence number
1:15:27
1 hour, 15 minutes, 27 seconds
port number we already know what it is right so correct application the data will be received to the correct application like WhatsApp or Google Chrome or whatever sequence number
1:15:35
1 hour, 15 minutes, 35 seconds
basically helps to reassemble the segments in the correct order we all know that all the data will not be transferred as once it will be
1:15:42
1 hour, 15 minutes, 42 seconds
transferred into chunks for that it has a sequence number I'll actually show you this sequence number also we'll have some commands lined up okay the next
1:15:51
1 hour, 15 minutes, 51 seconds
thing is flow control flow control basically transport layer control the amount of data that is being transferred so the server is you know having 40 mvpn
1:16:00
1 hour, 16 minutes
but the client has server is sending at 40 MVPs but the client is receiving at uh 20 MVPs so then that's not going to
1:16:09
1 hour, 16 minutes, 9 seconds
work okay it'll be like hey slow down also one more thing it works on is error control some data packets got lost
1:16:17
1 hour, 16 minutes, 17 seconds
or corrupted data or whatever so how it works with that this is also something we'll see in detail okay when we learn about transport layer in detail
1:16:25
1 hour, 16 minutes, 25 seconds
right now I'm just telling you the overview okay and it adds something known as a check sum to every data segment okay that way it can figure out
1:16:33
1 hour, 16 minutes, 33 seconds
whether the data that was received by a friend was good or not okay so there's like uh connection oriented transmission like TCP and
1:16:42
1 hour, 16 minutes, 42 seconds
there's a connection connection less oriented transmission called UDP UDP is faster because it it does not provide
1:16:49
1 hour, 16 minutes, 49 seconds
any feedback if data is lost or not it's like okay whatever data you're sending keep sending that is why some data packets get lost in UDP for example
1:16:58
1 hour, 16 minutes, 58 seconds
video conferencing or gaming but in TCP it's like when your friend receives the data your friend will send an
1:17:05
1 hour, 17 minutes, 5 seconds
acknowledgement hey Kunal uh internet I've got the data it means 100% data transferred don't worry so uses of TCP
1:17:12
1 hour, 17 minutes, 12 seconds
like email and file transfer protocol so on and so forth okay so that's basically about we learn
1:17:20
1 hour, 17 minutes, 20 seconds
more about like check sum and like segments and all these other things later on after that what happens is uh it gets transported so in here we'll be
1:17:29
1 hour, 17 minutes, 29 seconds
learning about UDP and TCP okay please make notes yourself okay
1:17:36
1 hour, 17 minutes, 36 seconds
um I can like can I don't want to like uh ruin it but uh please make like notes yourself and I have I'm sharing everything so you can make like make
1:17:43
1 hour, 17 minutes, 43 seconds
make notes yourself okay so now we come at Network layer so Network layer is pretty simple so Network layer basically
1:17:52
1 hour, 17 minutes, 52 seconds
works for the transmission of theed data segments from one computer to another that is located in a different
1:18:02
1 hour, 18 minutes, 2 seconds
network okay so basically here till now here we're talking about our own network right now but now when you're talking
1:18:10
1 hour, 18 minutes, 10 seconds
about sending this to the network layer now this is communic communicating with other computers outside this is where the
1:18:19
1 hour, 18 minutes, 19 seconds
router lives router lives over here router lives over
1:18:26
1 hour, 18 minutes, 26 seconds
here okay make your own
1:18:35
1 hour, 18 minutes, 35 seconds
notes from video okay so this thing like router lives over here and stuff uh things like
1:18:42
1 hour, 18 minutes, 42 seconds
that you can make your own notes okay what is the function of uh Network layer logical addressing so IP
1:18:51
1 hour, 18 minutes, 51 seconds
addressing done in the network layer is known as logical addressing because you all know every computer has their own IP address Network layer assigns the
1:19:00
1 hour, 19 minutes
senders and receivers IP address uh to every segment and it forms an IP packet now Kunal why why is it assigning
1:19:09
1 hour, 19 minutes, 9 seconds
the senders and receivers IP address to the packet the data packets that it's receiving so that every data packet can reach the correct
1:19:19
1 hour, 19 minutes, 19 seconds
destination okay sound good and also it performs routing so
1:19:27
1 hour, 19 minutes, 27 seconds
moving one data packet from source to destination okay it's based on like IP uh like IP addresses and things like
1:19:35
1 hour, 19 minutes, 35 seconds
that okay cool so it perform some sort of a you know like logical uh addressing and
1:19:43
1 hour, 19 minutes, 43 seconds
then it will transport the data okay we'll learn about how it does
1:19:49
1 hour, 19 minutes, 49 seconds
it in detail like subnet masking and routing from packet one to packet B how it happens internally everything we
1:19:57
1 hour, 19 minutes, 57 seconds
cover later on okay okay so it determines like okay Kunal um you know you have your own uh
1:20:05
1 hour, 20 minutes, 5 seconds
Network computer and there's your friend's computer what is the best path to take to send from data from your computer to your friend's computer what
1:20:13
1 hour, 20 minutes, 13 seconds
is the greatest path like I can take some routing protocols and stuff there a d algorithm that it may be using which we'll learn more about later so all
1:20:21
1 hour, 20 minutes, 21 seconds
these routing protocols and like transportation of packets and everything happens at the network layer load balancing also happens over here right
1:20:29
1 hour, 20 minutes, 29 seconds
to make sure that this it's not overloading okay cool after that the data is transported to data link layer
1:20:37
1 hour, 20 minutes, 37 seconds
data link layer basically allows like you to directly communicate with the computers and hosts
1:20:45
1 hour, 20 minutes, 45 seconds
okay okay so data link layer will receive the data packet from the network layer and this data packet contains the IP addresses of both the sender and the
1:20:53
1 hour, 20 minutes, 53 seconds
receiver which is you already talked about now at the data link layer it's actually doing two kinds of addressing logical addressing that is done at you
1:21:02
1 hour, 21 minutes, 2 seconds
know like the uh like the at the network layer which is about IP addresses and stuff um so when the sender and receivers IP addresses are assigned to
1:21:10
1 hour, 21 minutes, 10 seconds
form a packet so let's let's draw this only okay no problem no problem we can draw this particular thing how it works at the network layer okay no problem so
1:21:18
1 hour, 21 minutes, 18 seconds
we have your own computer you have your computer a okay you have your computer a it has a IP address of let's say
1:21:25
1 hour, 21 minutes, 25 seconds
something like uh 16811 okay it is connected to your network like this network number one
1:21:33
1 hour, 21 minutes, 33 seconds
your Wi-Fi okay it's connected to your Wi-Fi now here it's sending a message to let's say
1:21:41
1 hour, 21 minutes, 41 seconds
Facebook okay the data packet okay so a data Facebook will have its own server like 1921 168.3 point1 or
1:21:50
1 hour, 21 minutes, 50 seconds
for example it's the IP address of the Facebook server every pack it will contain three things it will contain the sender and receiver so if this is a
1:21:59
1 hour, 21 minutes, 59 seconds
receiver uh I have to draw it somewhere over here if this is a receiver Okay
1:22:05
1 hour, 22 minutes, 5 seconds
computer B 192 16 8.2.1 okay so this IP address
1:22:13
1 hour, 22 minutes, 13 seconds
192.168.1.1
1:22:25
1 hour, 22 minutes, 25 seconds
subnet mask this thing is known as a packet so as you can see whenever a packet is transported like this it will
1:22:33
1 hour, 22 minutes, 33 seconds
be like having the IP address of sender and receiver okay then it will be transported to next person that is
1:22:42
1 hour, 22 minutes, 42 seconds
basically how it works so in in data link layer what happens is when you receive the data over here this will obviously be at the network layer once
1:22:49
1 hour, 22 minutes, 49 seconds
you have received the data and whenever you're working with routers or whatever that's Network layer but now the idea is which application to send this data to
1:22:57
1 hour, 22 minutes, 57 seconds
this is know as physical addressing this is done as done at data link layer the physical addressing not The Logical networking addressing no the physical
1:23:05
1 hour, 23 minutes, 5 seconds
addressing and what are the physical addresses you may have heard about those Mac addresses okay now Mac addresses of
1:23:14
1 hour, 23 minutes, 14 seconds
sender and receiver are assigned to the data packet Mac
1:23:22
1 hour, 23 minutes, 22 seconds
addresses okay to form a frame so frame is basically a data unit of the data link
1:23:30
1 hour, 23 minutes, 30 seconds
layer what is a MAC address you may ask Mac address is a it's a 12-digit alpha numeric number of the network interface
1:23:38
1 hour, 23 minutes, 38 seconds
of your computer it's not like your computer has only one uh Mac address no your computer's Bluetooth may have some other network Mac address your
1:23:46
1 hour, 23 minutes, 46 seconds
computer's Wi-Fi may have another Mac address so on and so forth okay so data link layer performs
1:23:54
1 hour, 23 minutes, 54 seconds
two functions it will allow the all the upper layers of the OSI model to access the uh the these frames and stuff like it will pass on these frames whatever
1:24:02
1 hour, 24 minutes, 2 seconds
things that I just mentioned and it also controls how the data is placed and received uh from the Medias using such
1:24:10
1 hour, 24 minutes, 10 seconds
using things known as media access control so basically techniques used to get the frame on and off Media and like error detection and
1:24:19
1 hour, 24 minutes, 19 seconds
stuff okay things like that so what does data link layer do data link layers adds Mac addresses in a
1:24:27
1 hour, 24 minutes, 27 seconds
frame and in a packet calls it like a frame and uh pushes that frame in like you can then transport that frame all
1:24:35
1 hour, 24 minutes, 35 seconds
all right I'll I'll cover this in detail uh later on but let's move forward okay and then in the end we have our physical layer okay physical basically contains
1:24:44
1 hour, 24 minutes, 44 seconds
of Hardware this is the hardware section and here you actually have like your some mechanical like wires or something
1:24:50
1 hour, 24 minutes, 50 seconds
mediums and here uh it transmits uh the bits from electrical signals it does
1:24:57
1 hour, 24 minutes, 57 seconds
not have like packets or datagrams like or segments and things like that we talked about so you work with uh cables
1:25:04
1 hour, 25 minutes, 4 seconds
and stuff in this okay so data that you get from the above it will be like in the form of zeros and ones physical layer is going to convert this into you
1:25:13
1 hour, 25 minutes, 13 seconds
know and transport it over like wires and your local local media it can be like an electrical signal or something a light signal in the optical fiber cable
1:25:21
1 hour, 25 minutes, 21 seconds
or whatever or a radio signal in case of Wi-Fi or something okay so the physical signal uh the physical layer receives the signal converts it into like some at
1:25:30
1 hour, 25 minutes, 30 seconds
the receiver section okay so when the data is received to someone okay at that particular point of time the physical layer will receive the signal convert it
1:25:38
1 hour, 25 minutes, 38 seconds
into bits pass it to the data link layer uh as a frame and then frame will be you know moved to higher higher higher higher layers let's look at how it this
1:25:47
1 hour, 25 minutes, 47 seconds
things works like the order of execution how everything works okay let's see how this thing works a little bit easily so
1:25:54
1 hour, 25 minutes, 54 seconds
I'm just going to I am going to write it over here so you send a message this is
1:26:12
1 hour, 26 minutes, 12 seconds
you and this is your friend okay how it how this thing actually works so you have your
1:26:20
1 hour, 26 minutes, 20 seconds
application layer okay it will transport the message to your presentation layer okay the presentation layer will do its thing
1:26:29
1 hour, 26 minutes, 29 seconds
transport it into the session layer session layer will transport it into the transport layer and transport layer will make it into like packets and segments
1:26:37
1 hour, 26 minutes, 37 seconds
and stuff so divide it into like packets and stuff into the network layer okay Network layer will also bundle
1:26:46
1 hour, 26 minutes, 46 seconds
it okay assign the IP addresses so Network layer assigns the IP addresses sends it into the data link layer dat
1:26:54
1 hour, 26 minutes, 54 seconds
data link layer will assign the like mac addresses and stuff and send it to the physical router okay now your physical
1:27:03
1 hour, 27 minutes, 3 seconds
router will send it to the physical router of your friend via that okay so your physical router of your friend you
1:27:12
1 hour, 27 minutes, 12 seconds
can see this is not happening like directly I I'll just show you right now okay so how the IP addresses are resolved and
1:27:20
1 hour, 27 minutes, 20 seconds
everything we'll cover later on okay so your physical layer it will be like in your data link layer now it will give it to data link layer data link layer will
1:27:28
1 hour, 27 minutes, 28 seconds
give it to the network layer okay Network layer will give it to like the transport and then transport will uh add
1:27:38
1 hour, 27 minutes, 38 seconds
the session layer okay session to presentation presentation to application and your friend will receive your
1:27:46
1 hour, 27 minutes, 46 seconds
message presentation to application okay this is how how it
1:27:55
1 hour, 27 minutes, 55 seconds
works each layer it will be like okay it will imagine that I am talking to the session layer of my friend or I am talking to the presentation layer of my
1:28:03
1 hour, 28 minutes, 3 seconds
friend or me if my friend are chatting on WhatsApp so we'll be like I'm talking to the my friend's WhatsApp number okay but internally it's the route it takes
1:28:12
1 hour, 28 minutes, 12 seconds
is this thing that I just mentioned this is the route
1:28:21
1 hour, 28 minutes, 21 seconds
okay it's like a conceptual way okay so first it starts from application layer and the data is preed and everything and then it's transferred to the physical
1:28:29
1 hour, 28 minutes, 29 seconds
layer now this physical router will try to find the physical router of your friend using all the routing techniques and everything and all these other
1:28:38
1 hour, 28 minutes, 38 seconds
things and then it is goes back again till the application layer that's as simple as it is how it
1:28:45
1 hour, 28 minutes, 45 seconds
works okay that is the OSI model I talked in detail about every single layer and uh that's it okay so that was
1:28:53
1 hour, 28 minutes, 53 seconds
the OSI model there's one more model another model
Chapter 13: TCP/IP Model (5 Layers)
1:29:03
1 hour, 29 minutes, 3 seconds
another model this is known as the TCP IP model what is the difference between
1:29:11
1 hour, 29 minutes, 11 seconds
tcpip model and OSI model okay it's mostly similar uh it's just a little bit of a difference in like the layers and
1:29:19
1 hour, 29 minutes, 19 seconds
stuff so it is basically known as uh the Internet Protocol
1:29:26
1 hour, 29 minutes, 26 seconds
suit okay and it was developed by the uh the American like the uh arpa thing that
1:29:32
1 hour, 29 minutes, 32 seconds
I mentioned previously okay the idea is that it's sort of like similar uh to
1:29:38
1 hour, 29 minutes, 38 seconds
like uh OSI model but uh the layers are reduced not from not like they're not seven layers it's like having five
1:29:46
1 hour, 29 minutes, 46 seconds
layers only now okay so the layers are application layer
1:29:55
1 hour, 29 minutes, 55 seconds
transport layer Network layer data link
1:30:04
1 hour, 30 minutes, 4 seconds
layer and physical layer okay so you can see that the OSI models application presentation and
1:30:12
1 hour, 30 minutes, 12 seconds
session layer in this are merged into one okay so this is more like used practically and the OSI model is more
Chapter 14: Client Server Architecture
1:30:21
1 hour, 30 minutes, 21 seconds
like uh concept based okay Theory okay and uh that is it yeah
1:30:29
1 hour, 30 minutes, 29 seconds
let's see now uh basically now we're going to do a deep dive into these layers okay so we in detail see how
1:30:36
1 hour, 30 minutes, 36 seconds
these things work internally and like a little bit more um you know Hands-On approach and see how things work internally okay let's start with the
1:30:44
1 hour, 30 minutes, 44 seconds
very first one let's talk about application layer okay what is application layer we already covered okay but now it's time to get into the
1:30:52
1 hour, 30 minutes, 52 seconds
details of it so what is the what are like the responsibilities of this layer what do we do in this layer and like why why does this layer exist so s simple
1:31:01
1 hour, 31 minutes, 1 second
it's like the main like layer where users interact with right these are the layers where users interact with it it
1:31:07
1 hour, 31 minutes, 7 seconds
consists of applications right it Con consists of like uh uh various applications like your web browser so
1:31:14
1 hour, 31 minutes, 14 seconds
basically this users interact with this okay we all know we all it's very simple this is very simple users interact with
1:31:22
1 hour, 31 minutes, 22 seconds
this okay for examp example if you're talking about you know WhatsApp where does WhatsApp lie
1:31:31
1 hour, 31 minutes, 31 seconds
application layer WhatsApp your browsers Etc okay so you write your message you send your
1:31:39
1 hour, 31 minutes, 39 seconds
data and everything it's available in the like application layer is the one that you use to interact with it okay so the where is the application it's on
1:31:47
1 hour, 31 minutes, 47 seconds
like your devices okay where does it lie on your devices where on on your
1:31:56
1 hour, 31 minutes, 56 seconds
devices okay so application layer has like uh uh now imagine this okay how data is transferred how data is
1:32:04
1 hour, 32 minutes, 4 seconds
communicated what type of data is transferred using which types of like steps and rules and regulations this is dependent on protocols we already
1:32:13
1 hour, 32 minutes, 13 seconds
covered this there are many protocols like HTTP like file transfer email protocol um and uh like UDP for videos
1:32:20
1 hour, 32 minutes, 20 seconds
and TCP or whatever right um so application layer has some protocols okay let's let's we we'll also learn
1:32:29
1 hour, 32 minutes, 29 seconds
about like protocols here protocols and we'll also learn about the client server infra uh client server uh
1:32:39
1 hour, 32 minutes, 39 seconds
architecture also in this chck architecture okay because the idea is that whenever you send a request to some
1:32:47
1 hour, 32 minutes, 47 seconds
particular server they should be knowing like uh how to deal with that request
1:32:54
1 hour, 32 minutes, 54 seconds
okay if you want to talk to your particular server if the client wants to talk to the server the server should know what type of you know request I'm
1:33:01
1 hour, 33 minutes, 1 second
getting what do I have to reply so there should be a set of rules regul rules and regulations this is what is known as protocols let's look into it a little
1:33:10
1 hour, 33 minutes, 10 seconds
bit more detail okay so we already cover about this like in in in brief we talked about there's like a client and then there's like a you know a server and
1:33:18
1 hour, 33 minutes, 18 seconds
something like that so you have a client like this okay so let's see how applications like talk to each other there okay um and how applications are
1:33:27
1 hour, 33 minutes, 27 seconds
like in the in the networking system where applications lie and how does it work so you have your client over here you have your server over here we
1:33:34
1 hour, 33 minutes, 34 seconds
already made this diagram previously client sends a request server sends a response back we
1:33:42
1 hour, 33 minutes, 42 seconds
saw this in action also in the Firefox browser what is a server server is
1:33:50
1 hour, 33 minutes, 50 seconds
basically a system that uh let's say you know um controls your uh the website
1:33:56
1 hour, 33 minutes, 56 seconds
you're hosting for example okay so basically this is the client server architecture so here basically the
1:34:04
1 hour, 34 minutes, 4 seconds
application that we're talking about has two parts client part and a server side
1:34:11
1 hour, 34 minutes, 11 seconds
part okay and these are known as processes and they communicate through each
1:34:18
1 hour, 34 minutes, 18 seconds
other Okay cool so process will be running on this application and then another process will be running on like the client and another process will be
1:34:26
1 hour, 34 minutes, 26 seconds
running on server these will be communicating with each other okay so if you want to host your
1:34:32
1 hour, 34 minutes, 32 seconds
own server okay then uh obviously like uh you should have like some uh reliable IP address right uh which can be reached
1:34:42
1 hour, 34 minutes, 42 seconds
via bya clients okay and um you should be also having uh like
1:34:49
1 hour, 34 minutes, 49 seconds
um you know High availability your you don't want your servers to you down client on the other hand is uh you know uh folks who are
1:34:58
1 hour, 34 minutes, 58 seconds
using and who are consuming these resources us we are like you're making a request to Google you are a client okay so that's basically about it
1:35:08
1 hour, 35 minutes, 8 seconds
so when you make a request to like youtube.com Okay hey you're like hey YouTube uh show show me some videos or whatever so you are the client and the
1:35:16
1 hour, 35 minutes, 16 seconds
YouTube server is like the server and it sends you the data back so when I'm
1:35:23
1 hour, 35 minutes, 23 seconds
talking about servers of YouTube or Facebook or Microsoft or coo for example so we have a lot of servers we don't
1:35:32
1 hour, 35 minutes, 32 seconds
have just one server we have a lot of servers they they're like a lot of servers because this is like such a big
1:35:39
1 hour, 35 minutes, 39 seconds
company right so many folks are using if all the folks are contacting just one single server the server will go down
1:35:47
1 hour, 35 minutes, 47 seconds
happens many time when a result are announced so many students are trying to make request to the server and the servers are not not really fast or like
1:35:54
1 hour, 35 minutes, 54 seconds
not really enough websites crash same thing happened like you know uh so many like people try to buy PS5
1:36:03
1 hour, 36 minutes, 3 seconds
websites crash games the shop was not working at PS5 pre-order launch okay so these are known as these
1:36:11
1 hour, 36 minutes, 11 seconds
servers the collection of servers in a big company it's known as a data center okay it's like at a really big
1:36:19
1 hour, 36 minutes, 19 seconds
scale okay so when we talk about data centers we talk about like it's a collection of huge number number of computers okay it may have like static
1:36:26
1 hour, 36 minutes, 26 seconds
IP addresses addresses that do not change they have like very good you know internet connection that does not go down and high upload speed because you
1:36:35
1 hour, 36 minutes, 35 seconds
know uh there are also companies that are like renting their servers like Cloud providers which you talk talk more about later in the future of the devops boot camp okay you can actually do this
1:36:43
1 hour, 36 minutes, 43 seconds
thing that you're seeing on the screen right making a request to the server even though you type google.com but if you're in your terminal you just write
1:36:50
1 hour, 36 minutes, 50 seconds
ping google.com or something so you can see it's taking it in chunks packets that I talked about these are
1:36:58
1 hour, 36 minutes, 58 seconds
the sequences these are the time to live so something we'll cover later on okay no packet was lost 11 packets
1:37:07
1 hour, 37 minutes, 7 seconds
were received I told you about packets right these are those packets every packet is a size of 64 bytes these are the IP addresses of like Google
1:37:16
1 hour, 37 minutes, 16 seconds
server this maybe different for you because Google does not have just one server they have many servers okay
1:37:24
1 hour, 37 minutes, 24 seconds
and this something like the sequence so in order to make sure that data packets are received in sequences there are the
1:37:32
1 hour, 37 minutes, 32 seconds
sequence number I mentioned previously time to live is something I'll let you know later on how it how this thing actually works okay so that ping that
1:37:40
1 hour, 37 minutes, 40 seconds
basically you saw that was uh it it measures the round trip time for messages sent from the originating host
1:37:48
1 hour, 37 minutes, 48 seconds
to the destination of the computer and that are echoed back this entire time is known as pink ping time okay so
1:37:56
1 hour, 37 minutes, 56 seconds
questions I asked I got asked once like can we reduce this ping time not really because you're getting the best possible ping time signals are traveling at the
1:38:04
1 hour, 38 minutes, 4 seconds
speed of light through like cables and satellites Etc so you're getting the best possible time cool all right so
1:38:12
1 hour, 38 minutes, 12 seconds
this was about the client servers architecture there's one more way in which uh applications are connected from end systems this is known as peer
Chapter 15: Peer to Peer Architecture
1:38:20
1 hour, 38 minutes, 20 seconds
to-peer AR architecture or P2P okay so first is client server second is P2P peer to peer in
1:38:29
1 hour, 38 minutes, 29 seconds
this what happens is various devices uh applications that are running on various devices they get communicated uh they get connected with each other so there's
1:38:38
1 hour, 38 minutes, 38 seconds
no one server or a large data center or whatever okay so example in your college there may be many computers the
1:38:47
1 hour, 38 minutes, 47 seconds
computers will be connected to one another something like this something like that this is peer to-peer
1:38:56
1 hour, 38 minutes, 56 seconds
communication there's no one dedicated server but uh there's like a lot lot more the key advantage over here is that um you know you can scale it very
1:39:04
1 hour, 39 minutes, 4 seconds
rapidly okay and it's it's like a little bit like a decentralized network as well okay so here what is happening is gal
1:39:13
1 hour, 39 minutes, 13 seconds
what is client and what is server over here in this since this is also serving as a client and a server every single computer can be termed as a client as
1:39:22
1 hour, 39 minutes, 22 seconds
well and a server as well well a good example for this can be bit torrent right bit torrent you may have
1:39:30
1 hour, 39 minutes, 30 seconds
heard about like uh you know in bit torrent there's like seeding and stuff so how torrent works we'll cover more about that later on like how torrent
1:39:38
1 hour, 39 minutes, 38 seconds
works okay but torrent is a good example of this okay hybrid also exists some are PE to perer and also having some sort of
1:39:45
1 hour, 39 minutes, 45 seconds
a centralized database that is also possible cool so that was basically
Chapter 16: Networking Devices (Download PDF)
1:39:52
1 hour, 39 minutes, 52 seconds
about peer to peer all right now before we move forward I just want to give you a quick overview of all these networking like devices that we use it's a pretty
1:40:00
1 hour, 40 minutes
straightforward you can find the definitions like online I also have like a nice little PDF open over here the first one is like repeater so a repeater
1:40:07
1 hour, 40 minutes, 7 seconds
basically is at the physical layer we already know what the physical layer is now and the its job is to regenerate the signal over the same network because the
1:40:15
1 hour, 40 minutes, 15 seconds
signal before the signal becomes too weak or corrupted okay so it can be transmitted over the same network okay
1:40:23
1 hour, 40 minutes, 23 seconds
um and an important point to note over here is that it does not amplify the signal so when the signal becomes weak they copy the signal bit by bit and it
1:40:30
1 hour, 40 minutes, 30 seconds
reach regenerate to its original strength okay it's a two Port device okay so there are like two ports available um Hub basically is a
1:40:39
1 hour, 40 minutes, 39 seconds
multi-port repeater okay instead of just two Port it has multiple ports and it connects multiple wires coming from different branches for example the
1:40:48
1 hour, 40 minutes, 48 seconds
connector in like the star topology that we mentioned okay so it cannot like filter the data uh so the data packets will be sent to like all connected
1:40:55
1 hour, 40 minutes, 55 seconds
devices um in in other words it says that the collision domain of all host connected to HUB remains one okay and also they do not have the intelligence
1:41:04
1 hour, 41 minutes, 4 seconds
to find out what are the best path for the data packets so Hub is like a repeater only okay and the job is the is to regenerate the signal over the same
1:41:12
1 hour, 41 minutes, 12 seconds
network because it before it becomes too weak it will regenerate the network okay it will not amplify it or whatever but in Hub it's basically a multi-port
1:41:21
1 hour, 41 minutes, 21 seconds
repeater okay you can learn about the types of Hub or whatever Bridge operates at the data link layer we talked about the data link layer in detail we talked
1:41:29
1 hour, 41 minutes, 29 seconds
about Mac addresses right at the data link layer we'll obviously cover data link layer in detail but a bridge is type of a repeater have we covered yeah
1:41:37
1 hour, 41 minutes, 37 seconds
repeater is over here and it has an additional functionality that it can filter out content by reading the Mac addresses of the source and destination
1:41:44
1 hour, 41 minutes, 44 seconds
we know that at the data link ler the Target and packets what we have that contain the Mac addresses of what sender
1:41:52
1 hour, 41 minutes, 52 seconds
and receiver okay so it's able to filter that out switch is a multi-port bridge okay um
1:42:00
1 hour, 42 minutes
with a that can basically boost the performance and efficiency okay so it is also at data link layer because it's a bridge so bridges are at data link layer
1:42:09
1 hour, 42 minutes, 9 seconds
so it is also at a data link layer and it can perform like error checking and before forwarding the data so it makes it very efficient right cool router we
1:42:19
1 hour, 42 minutes, 19 seconds
already covered what are routers at Network layer we already covered it no problem gateway gateway is as the name suggests a pass a passage to connect two
1:42:27
1 hour, 42 minutes, 27 seconds
networks together that may work upon different networking models okay so for example uh here it's saying that uh it's
1:42:35
1 hour, 42 minutes, 35 seconds
sort of like one network will may may working on some different protocol another Network May working on different protocol it can basically connect that
1:42:43
1 hour, 42 minutes, 43 seconds
okay brouter is basically a bridge and router combined you can say right and it offers functionality of both bridg and router and this is like a nice little
1:42:52
1 hour, 42 minutes, 52 seconds
diagram for you okay so it's it's very simple nothing nothing you know major in this so I just wanted to mention like the um basic use
1:43:01
1 hour, 43 minutes, 1 second
cases of these things as well you can take a screenshot of this if you want and uh yeah cool okay now uh one more
Chapter 17: Protocols
1:43:08
1 hour, 43 minutes, 8 seconds
thing that I promised I will go into details was protocols so we all know what protocols are network protocols let's talk about protocols and by the way we're on application layer only
1:43:17
1 hour, 43 minutes, 17 seconds
right now okay protocols so every application will have some sort of a protocol if you're working with web develop web web web or something just
1:43:25
1 hour, 43 minutes, 25 seconds
browsing the internet you will be following like tcpip protocol HTTP for example right if you're sending someone a file then there's file transfer protocol if you're sending an email then
1:43:33
1 hour, 43 minutes, 33 seconds
there's simple mail transfer protocol so on and so forth okay so what are some of the protocols let's divide it into like categories I've
1:43:41
1 hour, 43 minutes, 41 seconds
already explained what protocols are so I won't like go into you know details details of it um we talked about packets and and protocols what protocols are and
1:43:50
1 hour, 43 minutes, 50 seconds
stuff let's talk about like web protocols when we talk about protocols protocols okay how it works and
1:43:58
1 hour, 43 minutes, 58 seconds
everything okay just talk about TCP I protocols for example okay so here you can have like uh
1:44:07
1 hour, 44 minutes, 7 seconds
HTTP okay hyper transfer protocol so it defines how uh you know the the HTML page like how data is transferred for
1:44:16
1 hour, 44 minutes, 16 seconds
example HTML pages and things like that I also mentioned briefly about DHCP uh Dynamic host control protocol it
1:44:24
1 hour, 44 minutes, 24 seconds
basically allocates the IP addresses to your uh de people and devices that are connected to your network right and I
1:44:31
1 hour, 44 minutes, 31 seconds
gave you a little nice diagram of that as well everything was covered file transfer protocol okay how the files are uh how how the files can be transferred
1:44:40
1 hour, 44 minutes, 40 seconds
but I don't think this is being used anymore because files can now be transferred over HTTP right um there's one more called simple mail transfer
1:44:47
1 hour, 44 minutes, 47 seconds
protocol this we'll see in detail how how emails work okay if you want to send a an email on receive an email how how
1:44:55
1 hour, 44 minutes, 55 seconds
it works using the simple mail transfer protocol okay it's used to send the emails to receive the emails you
1:45:03
1 hour, 45 minutes, 3 seconds
have pop 3 shout out to Dan Pop uh check out popcast pop and uh yeah and iMac
1:45:12
1 hour, 45 minutes, 12 seconds
okay so these are used to receive emails what else what else Protocols are there
1:45:20
1 hour, 45 minutes, 20 seconds
um SSH secure sh okay so if you want to log into a terminal of someone else's computer for
1:45:29
1 hour, 45 minutes, 29 seconds
example you can use SSS for that so we'll be using this heavily uh I'll be using the C Cloud instances and we'll be
1:45:36
1 hour, 45 minutes, 36 seconds
using that um in order to you know um log into your computer and things
1:45:42
1 hour, 45 minutes, 42 seconds
like that okay um all right so that's SSH and there's one more called I believe there are so many so you can
1:45:50
1 hour, 45 minutes, 50 seconds
Google it virtual network computing it's for graphical control okay that's it there's one more called tnet okay
1:45:59
1 hour, 45 minutes, 59 seconds
outside of like DCP I there's one called tnet so tnet is basically a terminal uh emulation that enables a user to connect
1:46:08
1 hour, 46 minutes, 8 seconds
to a remote host or a device using the Tet client okay usually it's over Port 23 Port 23 let me write the port over
1:46:16
1 hour, 46 minutes, 16 seconds
here as well okay so for example uh typing like Tet host name would connect you would
1:46:25
1 hour, 46 minutes, 25 seconds
connect like a user to a host name that is called like host name okay so if I say tet Kunal like it will connect me to a host name called Kunal so it enables
1:46:34
1 hour, 46 minutes, 34 seconds
users to manage an account or a device remotely okay it's a very low level protocol
1:46:41
1 hour, 46 minutes, 41 seconds
okay all right um cool one more thing in like HTTP and
1:46:48
1 hour, 46 minutes, 48 seconds
https and stuff s means secure so I'll talk more about that later we got data that is like encoded for example like utf8 and stuff okay these are the
1:46:56
1 hour, 46 minutes, 56 seconds
standards of encoding in tet it is like not encoded or encrypted okay so all these things are handled at the application layers is that what we're
1:47:05
1 hour, 47 minutes, 5 seconds
talking about right now UDP already mentioned a lot of times how it works I'll cover in detail I'm just listing it out right now so it's a connectionless
1:47:13
1 hour, 47 minutes, 13 seconds
session um like a stateless collection does not maintain the state okay data
1:47:20
1 hour, 47 minutes, 20 seconds
may be lost in this okay during the lifetime of the connection cool uh let's look into like
1:47:28
1 hour, 47 minutes, 28 seconds
a little bit more detail of like some of these uh protocols okay so now we have let's say applications okay and uh we're still on the application layer so
1:47:36
1 hour, 47 minutes, 36 seconds
obviously we're talking about applications so one thing we have to cover over here is uh how do these applications like talk to each other
1:47:43
1 hour, 47 minutes, 43 seconds
okay so there are like a few terms when we talk about like applications so basically let's talk about uh let's say
1:47:52
1 hour, 47 minutes, 52 seconds
we talk about about um WhatsApp okay so when we talk about WhatsApp this is known as our program
1:47:59
1 hour, 47 minutes, 59 seconds
like our application so our program is WhatsApp okay now this program WhatsApp
1:48:08
1 hour, 48 minutes, 8 seconds
will have some processes in it okay so for example you're sending a message okay or record a
1:48:18
1 hour, 48 minutes, 18 seconds
video These are known as processes of my program prr okay so what is a program a program
1:48:26
1 hour, 48 minutes, 26 seconds
is just like your application okay for example WhatsApp and um you know Amazon or Flipkart or uh email service or
1:48:33
1 hour, 48 minutes, 33 seconds
whatever okay that's a program an application process is what Pro process is like um um you know uh like uh one of
1:48:43
1 hour, 48 minutes, 43 seconds
the features of the program for example right or a running instance of a program okay so one program can have like many
1:48:51
1 hour, 48 minutes, 51 seconds
many processes running at one okay you're recording a video while sending a message for example okay and
1:48:58
1 hour, 48 minutes, 58 seconds
uh there's one more thing called um a thread you may have heard about thread so thread is a lighter
1:49:06
1 hour, 49 minutes, 6 seconds
version of a process okay so when we talk about like uh one process it can have like multiple
1:49:13
1 hour, 49 minutes, 13 seconds
running threads okay so what is the difference between like here I can say this has like some thread sending a message can
1:49:22
1 hour, 49 minutes, 22 seconds
have like like set up um you know the uh page or something recording a video
1:49:31
1 hour, 49 minutes, 31 seconds
open camera open camera or something so the only difference between a thread and a process is that the
1:49:39
1 hour, 49 minutes, 39 seconds
thread is only doing one single job okay so you have multi- LEL multi-threading uh know multi-threaded programs where
1:49:47
1 hour, 49 minutes, 47 seconds
multiple threads are working simultaneously that's basically what the idea of a thread is okay now now how do these uh things communicate with each
1:49:55
1 hour, 49 minutes, 55 seconds
other so we know that you have your application running on your phone and then there are so many billions and millions of phones in the world how does
1:50:03
1 hour, 50 minutes, 3 seconds
the internet determine you know which message is being sent from you want to send a message from your WhatsApp to someone else's WhatsApp how would it
1:50:10
1 hour, 50 minutes, 10 seconds
communicate over the Internet okay so here we are talking about addresses so IP addresses and port
1:50:18
1 hour, 50 minutes, 18 seconds
numbers we already talked about IP addresses we'll talk about port numbers in a in a single single second there's one more thing known as sockets okay so
Chapter 18: Sockets
1:50:27
1 hour, 50 minutes, 27 seconds
sockets are basically like uh you know um when you need to send messages from one system to like another system okay
1:50:36
1 hour, 50 minutes, 36 seconds
um we can use sockets for that so it's not like you're continuously like you know it's not like the client server stuff but it's more like um
1:50:45
1 hour, 50 minutes, 45 seconds
um it's a software process it's not like you have have something like like a hardware socket or whatever okay so
1:50:53
1 hour, 50 minutes, 53 seconds
uh it's basically like uh the interface that is there between like the processes that I mentioned and the internet for
1:51:00
1 hour, 51 minutes
example that's known as a socket okay so interface between uh process and the internet okay that's basically what a
1:51:09
1 hour, 51 minutes, 9 seconds
socket is and let's talk about ports you already know about IP addresses but let's talk about like ports a little bit more in
Chapter 19: Ports
1:51:18
1 hour, 51 minutes, 18 seconds
detail so let's see okay let's talk about ports we already about about ports IP addresses tells which device we are
1:51:26
1 hour, 51 minutes, 26 seconds
working with ports tell us which application we are working with now there may be possibility that many processes are running of one application
1:51:33
1 hour, 51 minutes, 33 seconds
you have many Chrome windows open okay so like Kunal I know like this data that you have requested whatever is coming from my friend needs to go to Google
1:51:41
1 hour, 51 minutes, 41 seconds
Chrome but which instance of Google Chrome which process of Google Chrome browser number one browser number two like tab number one two three or four or
1:51:50
1 hour, 51 minutes, 50 seconds
five how do we determine this thing there's this thing known as eeral ports for
1:51:56
1 hour, 51 minutes, 56 seconds
this e eepl Emeral ports Emeral ports so
1:52:04
1 hour, 52 minutes, 4 seconds
basically the idea is that let's say you have a you know port at reserved for uh for your HTTP so what the application
1:52:14
1 hour, 52 minutes, 14 seconds
like it will do internally is it will assign itself random number port numbers and it will work with that if the multiple application instances are
1:52:21
1 hour, 52 minutes, 21 seconds
running okay once the process is done it will be freed okay sound
1:52:28
1 hour, 52 minutes, 28 seconds
good cool so once the application is no no longer using it the port will be free now these eeral ports e Epal ports uh
1:52:37
1 hour, 52 minutes, 37 seconds
they can exist on the client side but on the server side you have to know the port
1:52:43
1 hour, 52 minutes, 43 seconds
number okay so servers uh you know you should have like defined well defined fixed port numbers because clients need
1:52:51
1 hour, 52 minutes, 51 seconds
to know about it internally internally they may use on its own like after the client has given the request then internally they can use these e eal
1:53:00
1 hour, 53 minutes
ports but yeah that's basically about it cool so that was about how this
1:53:07
1 hour, 53 minutes, 7 seconds
communication stuff happens all right so we're still on the application layer and we talked a little bit about the brief let's talk about HTTP in
Chapter 20: HTTP
1:53:16
1 hour, 53 minutes, 16 seconds
detail HTTP what is HTTP and how it works all right so HTTP I know we have covered
1:53:25
1 hour, 53 minutes, 25 seconds
this before but you still may be having a doubt K what is HTTP what is this protocol what is the difference between
1:53:31
1 hour, 53 minutes, 31 seconds
HTTP and TCP and UDP and tcpip and what is this thing Kun what is www and
1:53:38
1 hour, 53 minutes, 38 seconds
HTTP okay you may be having this question let's look into it HTTP is very simple I taught I taught you about
1:53:46
1 hour, 53 minutes, 46 seconds
client serval uh speaking is hard I taught you about client server architecture okay you have
1:53:54
1 hour, 53 minutes, 54 seconds
a client I'll draw this diagram one more time because it's very important you have a client here you have your server here I gave you a little bit of an
1:54:02
1 hour, 54 minutes, 2 seconds
example of like you know when you write google.com it gives you surf so you request something and the server will send you a
1:54:11
1 hour, 54 minutes, 11 seconds
response okay so this happens using the HTTP protocol you are like Kunal you are now annoying me please tell me what is
1:54:19
1 hour, 54 minutes, 19 seconds
HTTP protocol I've actually tell you told pretty much a lot of times but here it goes again it is a client server
1:54:27
1 hour, 54 minutes, 27 seconds
protocol okay and it tells us how you request this data from the server and it also tells us how the server will send
1:54:35
1 hour, 54 minutes, 35 seconds
back data to the client so when you make a request when a client makes a request to the server that is known as
1:54:42
1 hour, 54 minutes, 42 seconds
an HTTP request and when the server sends back a response to the client oh you wanted the Google web page here you
1:54:50
1 hour, 54 minutes, 50 seconds
go I'll send you a bunch of stuff that is known as an HTTP response okay so basically these are
1:54:59
1 hour, 54 minutes, 59 seconds
application layer protocols okay so every application layer protocol also requires some
1:55:07
1 hour, 55 minutes, 7 seconds
transport layer protocol okay so this is basically an application layer protocol HTTP okay has
1:55:15
1 hour, 55 minutes, 15 seconds
some methods like HT methods like get method push method so you want to get something so you use the get request you want to post something when you submit a
1:55:23
1 hour, 55 minutes, 23 seconds
form you use the post request for example so here we know that uh what are some of the transport layer protocols
1:55:31
1 hour, 55 minutes, 31 seconds
TCP and UDP okay transmission control protocol user datagram protocol we have learned about this in brief that uh UTP
1:55:40
1 hour, 55 minutes, 40 seconds
like uh is used in like video conferencing and stuff so here uh HTTP actually uses TCP okay so HTTP now you
1:55:48
1 hour, 55 minutes, 48 seconds
know what it is uses TCP transmission control
1:55:55
1 hour, 55 minutes, 55 seconds
protocol inside it for example okay because TCP makes sure that uh all the
1:56:02
1 hour, 56 minutes, 2 seconds
data is received and everything okay sttp does not store the state it's a stateless
1:56:10
1 hour, 56 minutes, 10 seconds
protocol okay stateless protocol so server will not store any information about the client by
1:56:17
1 hour, 56 minutes, 17 seconds
default Okay cool so example if the Ser if this client is making request again and again and again server will not treat that as
1:56:25
1 hour, 56 minutes, 25 seconds
like a one single you know client okay
1:56:34
1 hour, 56 minutes, 34 seconds
cool awesome okay so that's basically about it this is an you know this application Layel
1:56:42
1 hour, 56 minutes, 42 seconds
protocol application layer protocol it's in the application layer obviously and it uses this in the transport layer HTTP
1:56:50
1 hour, 56 minutes, 50 seconds
uses this in the transport layer transport
1:56:57
1 hour, 56 minutes, 57 seconds
layer application layer
1:57:06
1 hour, 57 minutes, 6 seconds
okay sound good TCP when we learn about it this is actually connection oriented it does not have to you know we don't
1:57:15
1 hour, 57 minutes, 15 seconds
have to lose any of the data that we are sending that is why a connection has to be made with the servers um and then
1:57:22
1 hour, 57 minutes, 22 seconds
once the connection has been made then you can exchange your data or whatever okay that is basically about it okay so whenever something we get in
1:57:31
1 hour, 57 minutes, 31 seconds
response for in the website we know that web pages www when we talked about it what is it it's just a collection of web pages so on web pages you see links you
1:57:39
1 hour, 57 minutes, 39 seconds
see text you see documents you see videos you see images you see objects all of these things have their own specific
1:57:47
1 hour, 57 minutes, 47 seconds
URL that is known as worldwide web let's try to see it okay so let's try to to see this thing um if I just talk about
1:57:54
1 hour, 57 minutes, 54 seconds
this thing if I say open image in new tab so this is a Google image you can see this image itself has its own
1:58:04
1 hour, 58 minutes, 4 seconds
URL so here this is the protocol https this is the URL okay and this this particular thing
1:58:12
1 hour, 58 minutes, 12 seconds
is the link to the resource this Google.com is the URL and this is the link to the resource of the
1:58:20
1 hour, 58 minutes, 20 seconds
basically google.com is the URL L okay and in This Server these are the folders and stuff and it contains the PNG file
1:58:28
1 hour, 58 minutes, 28 seconds
over here Google logo okay you can also add some arguments like you know many of times
1:58:36
1 hour, 58 minutes, 36 seconds
you have some arguments or something like that so you can add arguments over here as well so over here if I talk about this thing so you can see that it
1:58:43
1 hour, 58 minutes, 43 seconds
has um the file question mark type is equal to I or something like that this
1:58:51
1 hour, 58 minutes, 51 seconds
question mark stuff it's actually pretty common you go to amazon.com okay so here you can see it
1:59:01
1 hour, 59 minutes, 1 second
has a little bit off or if I just go to
1:59:08
1 hour, 59 minutes, 8 seconds
youtube.com Okay um I play Mr Bean or something so here you can see here's
1:59:16
1 hour, 59 minutes, 16 seconds
some argument video is so you go to this URL and the argument is question mark after question mark everything you put is a argument so video is equal to this
1:59:25
1 hour, 59 minutes, 25 seconds
video ID hence it will play this video ID okay cool and in this photo I'm
1:59:32
1 hour, 59 minutes, 32 seconds
talking about the request and response you can see that as well refresh click on any particular thing let say this one so you can see
1:59:41
1 hour, 59 minutes, 41 seconds
these are the response headers these are all the things you got into response these are the request headers okay host name is there tle uh
1:59:52
1 hour, 59 minutes, 52 seconds
and uh so many cookie and connection and cache control so many things are available okay okay I'm just going to
1:59:59
1 hour, 59 minutes, 59 seconds
move it because I know you can't see um let me move it
Chapter 21: HTTP(GET, POST, PUT, DELETE)
2:00:07
2 hours, 7 seconds
somewhere how do I how do we move it yeah I can do itth to the left for
2:00:15
2 hours, 15 seconds
example okay um and I'll just going to expand this made a request refresh okay how to get this thing just right click
2:00:22
2 hours, 22 seconds
inspect okay you just you can do this in Google Chrome also click on any link you can see the status if I just go back okay
2:00:30
2 hours, 30 seconds
inspect uh Network refresh so you can see type of method get post get get get
2:00:36
2 hours, 36 seconds
get get post get post get Etc okay let's talk about the types of these methods okay so we have when we talk about like HTTP methods what is what what is the
2:00:45
2 hours, 45 seconds
method when I'll first of all tell us that the method is basically that is telling the server what to do okay if you have get get method so you made a
2:00:53
2 hours, 53 seconds
get request let's say we say something like that HTTP methods okay talk about first one let's
2:01:01
2 hours, 1 minute, 1 second
say get so get basically means that you are requesting some data hey give me the web page give me this YouTube video or
2:01:09
2 hours, 1 minute, 9 seconds
whatever second one is post method something like hey I am a client and I am giving something to the server like a
2:01:16
2 hours, 1 minute, 16 seconds
web form when you register somewhere username password or whatever that is a post request okay and then there's
2:01:23
2 hours, 1 minute, 23 seconds
something known as put okay put as well cool so it basically puts data at a
2:01:33
2 hours, 1 minute, 33 seconds
specific location there's one known as delete as well if you want to delete data from the server you will send a delete request delete request is
2:01:41
2 hours, 1 minute, 41 seconds
available there okay so these are just some sort of a ways like in order to do it okay sound
2:01:50
2 hours, 1 minute, 50 seconds
good will learn more about it when we do like web development and stuff or if you know about web development you might be knowing about this already okay so here let's look at any one of the requests
2:01:59
2 hours, 1 minute, 59 seconds
let's say this one okay so here you can see it's saying it's a post request to this URL okay no problem okay and here you
2:02:08
2 hours, 2 minutes, 8 seconds
can see the request headers and the response so what did we send to the Like This Server okay so it's saying over here you can see accept accept encoding
2:02:17
2 hours, 2 minutes, 17 seconds
it encodes accepts this encoding accept language if you want to see what all these tags represent just click on the question mark it will open up MD and web
2:02:26
2 hours, 2 minutes, 26 seconds
docs okay so it says accept language request HTTP header indicates the natural language uh uh that the client
2:02:34
2 hours, 2 minutes, 34 seconds
prefers for example here it says English
2:02:41
2 hours, 2 minutes, 41 seconds
okay and here it says accept like what type of response are you trying to accept so here it's saying let's say I'm only trying to accept text HTML
2:02:49
2 hours, 2 minutes, 49 seconds
application stuff okay encoding is mentioned over here connection keep alive is mentioned over
2:02:56
2 hours, 2 minutes, 56 seconds
here right so this the type of the connection so here you can see more about
2:03:03
2 hours, 3 minutes, 3 seconds
it cool keep alive keep alive General head allows the sender to hit about hint about the the connection may be used to
2:03:12
2 hours, 3 minutes, 12 seconds
set a time out and a maximum amount of requests for example okay so for
2:03:19
2 hours, 3 minutes, 19 seconds
example if uh if you if you're talking about the connection to be like closed I believe as well then it's nonpersistent
2:03:26
2 hours, 3 minutes, 26 seconds
okay here it's saying that this allows us uh to hint about like how the connection may be used to set a timeout
2:03:35
2 hours, 3 minutes, 35 seconds
okay so you can set up a timeout and the amount of request like after this many amounts or whatever okay so you can set a timeout and the maximum number of
2:03:42
2 hours, 3 minutes, 42 seconds
requests that can be sent on this connection before closing it you can mention that okay so these are the responses
2:03:51
2 hours, 3 minutes, 51 seconds
that is also something we'll see later on okay there you
2:03:58
2 hours, 3 minutes, 58 seconds
go sound good that's basically about it okay similarly you can see what we got as a response from the server if I zoom in a
2:04:06
2 hours, 4 minutes, 6 seconds
little bit I'm not able to zoom in over here let me just check yeah I can I can as I got a response okay so here you can
2:04:15
2 hours, 4 minutes, 15 seconds
see that uh the encoding the content length what is the type of the content the date you know the server and uh the
2:04:24
2 hours, 4 minutes, 24 seconds
cookie information so on and so forth everything is available over here this is the raw raw
2:04:32
2 hours, 4 minutes, 32 seconds
one okay these are the status codes stock this is the HTTP version HTTP version
2:04:40
2 hours, 4 minutes, 40 seconds
this is like the uh status code let's talk about the status quotes a little bit more okay so when you send a request to the server you need some sort of a way to know whether the request was
Chapter 22: Error/Status Codes
2:04:48
2 hours, 4 minutes, 48 seconds
successful or did it fail or something like that or what happened okay for that there exist status codes status codes exist for that for example
2:04:57
2 hours, 4 minutes, 57 seconds
200 means that the request was successful okay and we have everything 404 means what it you know you could not
2:05:04
2 hours, 5 minutes, 4 seconds
find it okay uh 400 means like it's a it's a bad bad request right um and uh 500 means like there's some internal
2:05:12
2 hours, 5 minutes, 12 seconds
server error for example so there's like a class for this like uh error codes okay or status codes they are like some
2:05:19
2 hours, 5 minutes, 19 seconds
classes for this status codes if it lies in like the 100 range okay these are basically like uh
2:05:29
2 hours, 5 minutes, 29 seconds
informational category codes okay and if it lies like information related informational
2:05:38
2 hours, 5 minutes, 38 seconds
category when we're talking about 200 ranges success codes okay when we're talking about 300
2:05:46
2 hours, 5 minutes, 46 seconds
range codes these are for redirection purposes redirecting
2:05:53
2 hours, 5 minutes, 53 seconds
when we talk about 400 CES this is the client error that's something you did client error like you may press the
2:06:01
2 hours, 6 minutes, 1 second
false URL or whatever 500 means server
2:06:08
2 hours, 6 minutes, 8 seconds
error okay then that there's a error with the server cool so we saw request in like
2:06:15
2 hours, 6 minutes, 15 seconds
the real world and that was basically about uh about HTTP requests and stuff so so many types get put to you know
2:06:23
2 hours, 6 minutes, 23 seconds
post and stuff like that all right let's move forward okay now let's move forward so we're still talking about the application layer we start talking about
Chapter 23: Cookies
2:06:30
2 hours, 6 minutes, 30 seconds
like HTTP let's let's give you let me ask you a question now so I told you that this is like stateless over here you can see that HTTP is stateless
2:06:38
2 hours, 6 minutes, 38 seconds
protocol means you're visiting a website you visit the website again and again it will not maintain the state of you every time you visit a website it'll be like
2:06:46
2 hours, 6 minutes, 46 seconds
hey it's a new person visiting a website or whatever but you might be confused like that's not how it works in the real world if I'm making like if I log to
2:06:55
2 hours, 6 minutes, 55 seconds
Amazon or something and then I close the browser and then I start the browser again and I go to that particular website again it will stay it will save
2:07:03
2 hours, 7 minutes, 3 seconds
my session right it will save the items in the cart you will still be logged in it will not ask you to log out and log in again right does that happen when you
2:07:12
2 hours, 7 minutes, 12 seconds
log out so when you close the browser it automatically logs you out no right so like Kunal us saying HTTP stateless with
2:07:20
2 hours, 7 minutes, 20 seconds
every time you visit state state is not saved uh but you're still saying that this state saving Behavior exists like this we have noticed it ourself how does
2:07:29
2 hours, 7 minutes, 29 seconds
it happen the answer is cookies
2:07:36
2 hours, 7 minutes, 36 seconds
cookies what is a cookie cookie is a unique string okay it is a unique
2:07:43
2 hours, 7 minutes, 43 seconds
string so basically it is stored on the client's browser our browser it is stored over there it's a file that is
2:07:51
2 hours, 7 minutes, 51 seconds
stored in my browser okay stored in my
2:07:57
2 hours, 7 minutes, 57 seconds
browser okay when the first time this cookie is set when you visit the application on a website you visit for
2:08:04
2 hours, 8 minutes, 4 seconds
the very first time it will set a cookie okay and after that whenever you
2:08:10
2 hours, 8 minutes, 10 seconds
make a new request in that requests header a cookie will be sent then the server will know oh this
2:08:19
2 hours, 8 minutes, 19 seconds
request is coming from Kunal and Kunal has sent me this cookie let me check my database then the server will check the database and it will find the uh the
2:08:28
2 hours, 8 minutes, 28 seconds
state for that the server will know like who is
2:08:36
2 hours, 8 minutes, 36 seconds
contacting okay so you will send the request in a HTTP you know in an HTP HTTP request you
2:08:43
2 hours, 8 minutes, 43 seconds
will send the cookie and in the response this will be cookie there going to be a cookie stored in your browser and there's going to be some cookie data in
2:08:51
2 hours, 8 minutes, 51 seconds
the server okay user value basically okay this cookie user value is kunal's Cookie
2:08:59
2 hours, 8 minutes, 59 seconds
for example okay so let's see how a little bit more how it works in detail so here you can see in the response whenever a
2:09:08
2 hours, 9 minutes, 8 seconds
server wants to set up a cookie here you can see in the response it has a tag called set- cookie it has some URL and
2:09:16
2 hours, 9 minutes, 16 seconds
names and like some path and stuff like that and here it has the expiration date so this is the expiration date for the cookie just like you know like cookies
2:09:24
2 hours, 9 minutes, 24 seconds
expire here also cookies expire that's basically how it works okay you can see in this header or here you can see the string over in this
2:09:33
2 hours, 9 minutes, 33 seconds
header as well that's it we talked about headers already okay but sometimes like cookies
2:09:40
2 hours, 9 minutes, 40 seconds
uh you know can be misused by like websites and companies and things like that to you know just track you when you visit the website and show you like what
2:09:49
2 hours, 9 minutes, 49 seconds
or whatever like it it's not everyone is comfortable with such things right Knowing When you visit the website or whatever okay there's one more thing
2:09:56
2 hours, 9 minutes, 56 seconds
known as third party cookies in Safari and stuff you know in browsers you may see some options at
2:10:05
2 hours, 10 minutes, 5 seconds
times like uh uh you want to disable third party cookies or whatever okay so third party party cookies basically
2:10:14
2 hours, 10 minutes, 14 seconds
cookies that are set for the URLs that you do not visit okay for example you
2:10:22
2 hours, 10 minutes, 22 seconds
visit uh flipcart.com or some other website xyz.com it has it an integrated
2:10:28
2 hours, 10 minutes, 28 seconds
like um you know um ad for example for some other website so that way some website may use your cookies the website
2:10:37
2 hours, 10 minutes, 37 seconds
you may not have visited so try to Google about this on your own like how to block third party cookies what all measures you can take and how some
2:10:45
2 hours, 10 minutes, 45 seconds
companies are you know managing cookies and uh what all ways they use cookies for so Google about it okay so that was
2:10:52
2 hours, 10 minutes, 52 seconds
about like HTTP okay that was it about HTTP um one more thing that in application layer what are applications do we interact with email also right so
Chapter 24: How Email Works?
2:11:01
2 hours, 11 minutes, 1 second
let's see how email works how email
2:11:10
2 hours, 11 minutes, 10 seconds
works so what is the application Level protocol for email for sending email it's SMTP as I mentioned previously uh
2:11:19
2 hours, 11 minutes, 19 seconds
it's known as simple mail transfer protocol okay it's used to send email to people and in order to receive it you
2:11:26
2 hours, 11 minutes, 26 seconds
can use something like pop 3 or something okay so this is the application layer protocol at the
2:11:33
2 hours, 11 minutes, 33 seconds
application layer but how is the data going to be transported which transport layer protocol do we use PCP or UDP in
2:11:42
2 hours, 11 minutes, 42 seconds
UDP we know some data will be lost do you want your email data to be lost emails are very important things you
2:11:49
2 hours, 11 minutes, 49 seconds
want to be you want to send entire email right how TCP Works how UDP works I will teach you in transport layer okay so
2:11:57
2 hours, 11 minutes, 57 seconds
forget about that right now just think about what it's doing TCP and UDP what TCP and UDP are doing the how how it's
2:12:06
2 hours, 12 minutes, 6 seconds
happening we are talking about application layer now okay so I'll be teaching you how application layer protocols work so I taught you how HTTP
2:12:14
2 hours, 12 minutes, 14 seconds
works now I'm teaching you how email works okay so which transport layer protocol will email use TCP or UDP TCP
2:12:23
2 hours, 12 minutes, 23 seconds
because we want the entire data available to us isn't that what we want so that is what happens if I'm talking about s uh SMTP like simple mail
2:12:32
2 hours, 12 minutes, 32 seconds
transfer how to send the email so basically the email clients like I'm if I'm using Google do gmail.com or
2:12:39
2 hours, 12 minutes, 39 seconds
whatever they will have their own servers they will have their own servers so let's say you're sending an email
2:12:45
2 hours, 12 minutes, 45 seconds
from yahoo.com to gmail.com then what will happen is that you are send sending the data this is the
2:12:53
2 hours, 12 minutes, 53 seconds
sender okay so what will happen is that the sender is going to send the email to the senders SMTP
2:13:02
2 hours, 13 minutes, 2 seconds
server senders SMTP server the email will live over here for a while okay it will then make a
2:13:11
2 hours, 13 minutes, 11 seconds
connection with the receivers SMTP server you can get the data of the
2:13:20
2 hours, 13 minutes, 20 seconds
server as well uh information which I'll show you later on okay after the connection is established this is
2:13:27
2 hours, 13 minutes, 27 seconds
transferred to This Server this is the receiver now when the receiver logs into
2:13:36
2 hours, 13 minutes, 36 seconds
the system as you may see whenever you log into an email client when you Lo log into your email application and refresh
2:13:42
2 hours, 13 minutes, 42 seconds
it it's below it says downloading email from server in iPhone it does right that's basically what it does after that
2:13:51
2 hours, 13 minutes, 51 seconds
receiver is like he is it downloading something then it downloads the new emails that is how it works so internally it's using TCP how
2:14:00
2 hours, 14 minutes
TCP Works will cover in transport layer right now this is what is happening so you push the email to your server that will connect to by by the
2:14:09
2 hours, 14 minutes, 9 seconds
way if both the receivers are on the same uh you know account for example both are using uh Google gmail.com then
2:14:17
2 hours, 14 minutes, 17 seconds
this thing does not happen this thing this connection thing does not happen directly transferred it
2:14:24
2 hours, 14 minutes, 24 seconds
okay cool and there may be many scenarios in which like uh error handling may be required like message not delivered or something like that
2:14:32
2 hours, 14 minutes, 32 seconds
right so it uh sometimes happens that um you know if the if this server is offline the receiving server is offline
2:14:39
2 hours, 14 minutes, 39 seconds
right then this sending server will keep on trying after a few for a few few few days before it gives up okay we'll talk
2:14:47
2 hours, 14 minutes, 47 seconds
more about that how error handling happens in like TCP okay so that is basically about it when
2:14:55
2 hours, 14 minutes, 55 seconds
we talk about these servers you can actually um take a look at the uh you know um the the name server lookup you
2:15:04
2 hours, 15 minutes, 4 seconds
can use the name server lookup command and you can find the uh name and the IP address of the SMTP servers for various
2:15:12
2 hours, 15 minutes, 12 seconds
domains try to see that okay so you can use this I'm saying uh ands look up type mxin Mail Exchange it basically means
2:15:19
2 hours, 15 minutes, 19 seconds
SMTP servers and for gmail.com there you got all the information sound good all right okay so
2:15:28
2 hours, 15 minutes, 28 seconds
we learned about SMTP which is used to send emails now let's look how you can download emails so one is known as
2:15:35
2 hours, 15 minutes, 35 seconds
Pop okay pop uh pop basically means uh post office protocol okay basically this
2:15:43
2 hours, 15 minutes, 43 seconds
is how it works um you first connect the client connects to the pop server okay using TCP you can connect it it uses uh
2:15:52
2 hours, 15 minutes, 52 seconds
Port uh I believe uh 110 so you can connect it on Port 110 it does all the author authorization you can obviously
2:16:00
2 hours, 16 minutes
you have a username and password right and then the client asks the servers for all the emails hey give me all my new emails that are unread or whatever okay
2:16:09
2 hours, 16 minutes, 9 seconds
so you have your client you have the pop
2:16:16
2 hours, 16 minutes, 16 seconds
server okay you uh authorize it connect and author authoriz and then you transact all the
2:16:26
2 hours, 16 minutes, 26 seconds
emails transact all the emails get all the emails okay and after that you can update it okay so you can close this
2:16:33
2 hours, 16 minutes, 33 seconds
session and the server will make update on your command right so for example if you uh ask it to delete something it will delete
2:16:41
2 hours, 16 minutes, 41 seconds
it okay
2:16:49
2 hours, 16 minutes, 49 seconds
cool one point I i' like to make is that uh the the other folders like uh sent
2:16:57
2 hours, 16 minutes, 57 seconds
items and drafts and all these are things these are not synced when we're using this protocol
2:17:03
2 hours, 17 minutes, 3 seconds
pop Okay cool so you can either download the emails and then delete those right
2:17:10
2 hours, 17 minutes, 10 seconds
from the server um or you can uh download and keep the emails like on the server as well
2:17:19
2 hours, 17 minutes, 19 seconds
cool notice something if you download the emails and delete all the emails from the server then emails will only be available on this client it will not be
2:17:26
2 hours, 17 minutes, 26 seconds
available on any new device you use okay the second one is
2:17:33
2 hours, 17 minutes, 33 seconds
IMAP is also used to get get your emails it's known as Internet message access protocol okay it's a little bit more
2:17:42
2 hours, 17 minutes, 42 seconds
complex but uh it allows you to view your emails on multiple devices okay so obviously emails will be
2:17:50
2 hours, 17 minutes, 50 seconds
kept on the server forever and it will not be like deleted unless you delete it you know manually right um local copies
2:17:58
2 hours, 17 minutes, 58 seconds
will be you know available on various various devices and you can sync all your folders as well and all these other things okay so example I use my you know
2:18:07
2 hours, 18 minutes, 7 seconds
Mac OS like if I'm using an email on my if I delete an email from my iPhone it will be deleted from my Mac and my iPad
2:18:15
2 hours, 18 minutes, 15 seconds
whatever okay sound good so that's basically about how email works you all know about
2:18:23
2 hours, 18 minutes, 23 seconds
the email stuff like the message and subject and you know um headers and bodies and things like that so you all
2:18:29
2 hours, 18 minutes, 29 seconds
already like know about it so no worries cool that's basically about
2:18:35
2 hours, 18 minutes, 35 seconds
it all right uh that was it about emails and uh yeah pretty much about it all
2:18:44
2 hours, 18 minutes, 44 seconds
right let's move forward one more thing I want to cover in application layer is uh when we talk about uh IP addresses and and uh URLs right so we did not talk
2:18:53
2 hours, 18 minutes, 53 seconds
about that in detail so what is the URL what is this. i. edu.org domain level
Chapter 25: DNS (Domain Name System)
2:19:01
2 hours, 19 minutes, 1 second
names or DNS which I was talking about earlier let's talk about that okay now let's talk about we talked about like uh this is an
2:19:09
2 hours, 19 minutes, 9 seconds
important point now let's talk about like uh we know that uh when we when we type www.google.com it connects us with the
2:19:17
2 hours, 19 minutes, 17 seconds
Google server that has some IP address okay so it's sort of like um you know phone in your phone book you have contacts names and every name has a
2:19:26
2 hours, 19 minutes, 26 seconds
phone number similarly you have like your uh domain names and every domain name will have like a IP address
2:19:34
2 hours, 19 minutes, 34 seconds
associated with it okay but now the question is Kunal where is this being stored where is this phone book stored and how does it find when you type
2:19:42
2 hours, 19 minutes, 42 seconds
google.com how does it find that server that is the real question now okay comes into picture DNS
2:19:52
2 hours, 19 minutes, 52 seconds
it's a very very important topic DNS okay
2:19:59
2 hours, 19 minutes, 59 seconds
cool awesome so DNS basically means domain name
2:20:07
2 hours, 20 minutes, 7 seconds
system domain name system okay so basically domain names
2:20:16
2 hours, 20 minutes, 16 seconds
are mapped to IP addresses we know that and uh we use a service uh let's say they're stored in some database or
2:20:24
2 hours, 20 minutes, 24 seconds
whatever and uh we use a service to look up into these databases the most popular service for this is domain name system
2:20:33
2 hours, 20 minutes, 33 seconds
DNS okay so when you enter google.com uh it will use DNS to find
2:20:41
2 hours, 20 minutes, 41 seconds
the IP address of Google's server okay cool okay so you'll be like Kunal
2:20:49
2 hours, 20 minutes, 49 seconds
how how is this a part of app application layer how does that work well because you know it's very difficult for us to
2:20:56
2 hours, 20 minutes, 56 seconds
remember the um you know the IP addresses so that's why we use uh the domain names so what happens is when you type
2:21:05
2 hours, 21 minutes, 5 seconds
www.google.com HTTP protocol is going to take that domain name it's going to use DNS okay domain name system it's going
2:21:13
2 hours, 21 minutes, 13 seconds
to use that I'll tell you how it uses it but let's see how what it's doing so it's going to use it and it's going to convert that URL into the IP address and
2:21:21
2 hours, 21 minutes, 21 seconds
after that it will connect to the server make sense google.com you type in the browser okay HTTP we already covered
2:21:28
2 hours, 21 minutes, 28 seconds
HTTP is HTTP will take that URL and it will try to find its IP address and once the IP address have been has been found
2:21:36
2 hours, 21 minutes, 36 seconds
then it will connect to that server so what is DNS T thing so it's basically a directory a database service
2:21:43
2 hours, 21 minutes, 43 seconds
for example let's say we have some friends in the world who have some big big databases that have a store of all the AR record of all these things like
2:21:52
2 hours, 21 minutes, 52 seconds
Okay Google's ww.google.com has a server name this thing or this thing this is the IP address for that so on and so
2:21:59
2 hours, 21 minutes, 59 seconds
forth so we ask our friends hey HTTP asks the friends hey you are a DNS directory service database can you please tell me I if I have a google.com
2:22:07
2 hours, 22 minutes, 7 seconds
can you please give me the uh IP address for it it'll be like yeah sure let's look into this in a little bit more
2:22:14
2 hours, 22 minutes, 14 seconds
detail there are so many URLs in the world right there are so many URLs if we had just one single database that's not
2:22:21
2 hours, 22 minutes, 21 seconds
going to be enough for us because where would you put it okay where would be would be located and what if that's database goes down you will not be able
2:22:30
2 hours, 22 minutes, 30 seconds
to resolve any D any any domain name right so and also everyone will be
2:22:38
2 hours, 22 minutes, 38 seconds
directly trafficking on that database only so these databases are divided into like various classes of domains okay let's see what these
2:22:47
2 hours, 22 minutes, 47 seconds
classes are so when you type something like this let's say okay so something you have like let's say
2:22:54
2 hours, 22 minutes, 54 seconds
mail.google.com or something so you have like a mail service of
2:23:03
2 hours, 23 minutes, 3 seconds
google.com this is known as the subdomain okay what is a subdomain
2:23:11
2 hours, 23 minutes, 11 seconds
subdomain is basically like a a part of the bigger domain okay Google has a mail service so Google is the this is the main domain this is the this is is known
2:23:20
2 hours, 23 minutes, 20 seconds
as the second level domain and what is this this is the top
2:23:29
2 hours, 23 minutes, 29 seconds
level domain I'll tell you the differences one second this is the top
2:23:37
2 hours, 23 minutes, 37 seconds
level domain okay now let's talk about this so instead of storing everything in one database there are multiple databases for these three
2:23:45
2 hours, 23 minutes, 45 seconds
categories okay the top ones are known as your root servers root DNS
2:23:56
2 hours, 23 minutes, 56 seconds
servers okay root DNS servers this is like the first point of contact for your query and anything like uh whenever you
2:24:05
2 hours, 24 minutes, 5 seconds
write a domain name okay after your local system we'll talk more about that later okay so this is the root DNS server they have their top level domains
2:24:14
2 hours, 24 minutes, 14 seconds
do uh IO for example dotorg for example Dot com for example so on and so forth
2:24:23
2 hours, 24 minutes, 23 seconds
top level domains okay these it's these themselves have something like student.
2:24:35
2 hours, 24 minutes, 35 seconds
or com classroom.org something like that do like google.com or
2:24:44
2 hours, 24 minutes, 44 seconds
something okay so these are second level domains we talked about this over here second level domain
2:24:52
2 hours, 24 minutes, 52 seconds
okay so that is basically about it so the root DNS servers are the main ones the first point of
2:25:00
2 hours, 25 minutes
contact okay so how it actually works let's see let me tell you a little bit
2:25:06
2 hours, 25 minutes, 6 seconds
more so what happens is that uh when we talk about root DNS servers so you can
2:25:13
2 hours, 25 minutes, 13 seconds
actually check out all like who is actually maintaining the root DNS servers like who is maintaining it we can check that out on this website so you can go to this website root servers.
2:25:24
2 hours, 25 minutes, 24 seconds
org and here you can see that uh around 32 are here the you know root DNS servers around 162 are somewhere over
2:25:33
2 hours, 25 minutes, 33 seconds
here around 10 are here and so on and so forth around six are here there's five around New Delhi there's one in uh New
2:25:42
2 hours, 25 minutes, 42 seconds
Delhi the it's operated by internet systems uh Consortium for example this
2:25:49
2 hours, 25 minutes, 49 seconds
is the ipv and IPv6 IP addresses by the way we will talk about ipv4 versus IPv6 as well okay number of instances so on
2:25:56
2 hours, 25 minutes, 56 seconds
and so forth so here are the root DNS servers okay and then we can talk about
2:26:02
2 hours, 26 minutes, 2 seconds
these top level domains like.org and uho or whatever companies have their own
2:26:10
2 hours, 26 minutes, 10 seconds
such uh as well right some companies they have their own uh such such uh domain names right so
2:26:18
2 hours, 26 minutes, 18 seconds
basically um this one the top level domain okay the top level servers this is
2:26:26
2 hours, 26 minutes, 26 seconds
basically uh organization type specific so is being used for commercial organizations edu for educational
2:26:34
2 hours, 26 minutes, 34 seconds
institutions org for like nonprofit organizations for example right but it is now open to General use also okay uk.
2:26:43
2 hours, 26 minutes, 43 seconds
us.in or country specific okay so these the database for this is stored like they are uh these
2:26:51
2 hours, 26 minutes, 51 seconds
are the ones that are managed by I can internet Corporation for assigned names and numbers organization I can so you
2:26:59
2 hours, 26 minutes, 59 seconds
can go to I can.org and once you go to I can.org you can see that they are the ones who register all of these uh top
2:27:09
2 hours, 27 minutes, 9 seconds
level domains I can so now you know the answer where these are stored I can okay okay so what
2:27:18
2 hours, 27 minutes, 18 seconds
happens when we uh put google.com in our website okay what will happen let's see when we write
2:27:26
2 hours, 27 minutes, 26 seconds
google.com this is your computer okay this is your computer you write google.com What will happen so the idea
2:27:33
2 hours, 27 minutes, 33 seconds
is that first it will check in its own computer first I will check in my own
2:27:45
2 hours, 27 minutes, 45 seconds
computer okay so basically what happens is whenever you a website for the first time it will store the value of its IP
2:27:55
2 hours, 27 minutes, 55 seconds
address that it has found in your local cache local database on your system somewhere why because you don't want to
2:28:03
2 hours, 28 minutes, 3 seconds
search for it again and again you may visit google.com again and again do you want to visit it do you want to search for it in the entire you know Globe
2:28:11
2 hours, 28 minutes, 11 seconds
again and again no imagine you are not able to find it imagine we are not able to find it
2:28:18
2 hours, 28 minutes, 18 seconds
let's say in the in the local system then what what happens then basically uh
2:28:24
2 hours, 28 minutes, 24 seconds
it's going to look it in the um not in the local C after it's not find in the
2:28:30
2 hours, 28 minutes, 30 seconds
local cach then in the local DNS server okay so users local DNS server okay so
2:28:39
2 hours, 28 minutes, 39 seconds
the local DNS server is basically uh the first point of contact okay okay so for example many times it's
2:28:47
2 hours, 28 minutes, 47 seconds
your internet service provider this is one more point so your local DNS server your internet service provider
2:28:55
2 hours, 28 minutes, 55 seconds
for example local server so what happens is one one thing I want to share is your internet service provider actually has
2:29:02
2 hours, 29 minutes, 2 seconds
information of all the websites you visit it does not matter if you're turning on incognito mode or whatever they they know everything okay and if
2:29:11
2 hours, 29 minutes, 11 seconds
something bad happens then they are liable to tell the police and the government everything okay so next is your local
2:29:18
2 hours, 29 minutes, 18 seconds
DNS server if if you are not able to find it over there as well then it is going to check in the root server in the root server like if you're
2:29:27
2 hours, 29 minutes, 27 seconds
searching for Doom it will search in the root server hey do you have a do com in the root server somewhere in the root
2:29:35
2 hours, 29 minutes, 35 seconds
server that we just mentioned okay then root server is going to be like hey I don't have a com please
2:29:43
2 hours, 29 minutes, 43 seconds
ask the top level domain so top level domain is going to be like okay it's going to be like it's going to be like nope I don't have it is going to check
2:29:52
2 hours, 29 minutes, 52 seconds
the top level domain okay and top level domain obviously it's going to have all the
2:30:00
2 hours, 30 minutes
Dooms and iOS and do nets and orgs so this will give you the IP address
2:30:07
2 hours, 30 minutes, 7 seconds
answer it will give you the IP address
2:30:16
2 hours, 30 minutes, 16 seconds
okay okay sound good and then this will connect to the server of
2:30:28
2 hours, 30 minutes, 28 seconds
google.com these are the steps step number 1 2 3 4 5 6 that's it as simple
2:30:35
2 hours, 30 minutes, 35 seconds
as that
2:30:43
2 hours, 30 minutes, 43 seconds
okay sound good that is basically about it okay cool one thing I'd like to mention over here is that you cannot buy
2:30:52
2 hours, 30 minutes, 52 seconds
a buy a domain name okay you you can only rent it okay for example if you're renting it via go godaddy.com then
2:31:00
2 hours, 31 minutes
GoDaddy Etc they pay some amount to like I can and we pay amount to like GoDaddy and stuff so that's it
2:31:08
2 hours, 31 minutes, 8 seconds
yeah cool some organizations have their own top level domains like I was mentioning previously like Google has a DOT Google right fire is owned by Amazon
2:31:17
2 hours, 31 minutes, 17 seconds
for example okay you cannot buy by a domain name you can only um like uh you
2:31:23
2 hours, 31 minutes, 23 seconds
know um rent it okay cool okay you can also see the messages you know received by the DNS
2:31:32
2 hours, 31 minutes, 32 seconds
servers you can use the dick command for that so there you go okay this is basically consisting of uh this IP
2:31:39
2 hours, 31 minutes, 39 seconds
address is basically um the one that is stored in my local cache okay so you can check out the man
2:31:47
2 hours, 31 minutes, 47 seconds
page of dig and you can say it's a DNS lookup utility okay so it's a domain
2:31:54
2 hours, 31 minutes, 54 seconds
information grouper is a flexible tool for integrating interrogating DNS name servers it performs the DNS lookups and displays the answers that are returned
2:32:03
2 hours, 32 minutes, 3 seconds
from the name servers that were queried okay so there you
2:32:10
2 hours, 32 minutes, 10 seconds
go all right okay so that was about the very first layer of the TCP model okay where are all our layers where are the
2:32:18
2 hours, 32 minutes, 18 seconds
layers here we go these are the layers of TCP model
Chapter 26: TCP/IP Model (Transport Layer)
2:32:27
2 hours, 32 minutes, 27 seconds
first we talked about application layer now let's talk about the transport layer okay you all are pretty much aware of let's say data link layer should not be
2:32:36
2 hours, 32 minutes, 36 seconds
a problem physical layer like basic understanding should not be a physical means the physical stuff okay even though we'll dive into details of this
2:32:44
2 hours, 32 minutes, 44 seconds
as well but what if someone asks you what is the difference between transport layer and network layer what is the work done by transport layer and what is the
2:32:53
2 hours, 32 minutes, 53 seconds
work done by Network layer by now you may know like a little bit of an information but you will definitely 98% be having a doubt what are the
2:33:01
2 hours, 33 minutes, 1 second
differences between transport and network what are these two doing what is happening hence now let's look into it
2:33:09
2 hours, 33 minutes, 9 seconds
in detail now let's look into transport layer
2:33:17
2 hours, 33 minutes, 17 seconds
okay second one which is transport layer I told you before first I will
2:33:26
2 hours, 33 minutes, 26 seconds
tell you in brief in short about every layer and now I'm doing a deep dive in every layer okay
2:33:33
2 hours, 33 minutes, 33 seconds
so transport layer let's say you are texting your
2:33:40
2 hours, 33 minutes, 40 seconds
friend you're using Whatsapp or something and you're texting your friend this is you this is your friend
2:33:52
2 hours, 33 minutes, 52 seconds
you're using Whatsapp or something some messenger okay you're using some messenger your friend is also some using some Messenger application okay you
2:34:01
2 hours, 34 minutes, 1 second
write your message and you send it to your friend like this okay and then your friend receives
2:34:07
2 hours, 34 minutes, 7 seconds
the message what is happening we already talked about the application layer how WhatsApp is interacting with the
2:34:15
2 hours, 34 minutes, 15 seconds
internet we talked about that but what is the role of the transport layer this this thing that is happening like
2:34:23
2 hours, 34 minutes, 23 seconds
one message being transferred from one computer to another the transportation part is done by Network
2:34:31
2 hours, 34 minutes, 31 seconds
layer okay from one computer from one computer to another computer this transportation is done by what network
2:34:39
2 hours, 34 minutes, 39 seconds
layer and what is done by transport layer then transport layer is the layer
2:34:46
2 hours, 34 minutes, 46 seconds
that lies over here inside the devices so the role of the transport layer is to take the information whatever message
2:34:55
2 hours, 34 minutes, 55 seconds
your friend is sending from the network to the application
2:35:02
2 hours, 35 minutes, 2 seconds
understood so from one network to another network if data needs to be transferred that is done by that part is done by Network layer the actual
2:35:10
2 hours, 35 minutes, 10 seconds
transportation from one computer to another but within that computer transportation of the data from the
2:35:17
2 hours, 35 minutes, 17 seconds
network to the applications that is done by transport
2:35:24
2 hours, 35 minutes, 24 seconds
layer okay so Network layer is going to take care of delivering this message from one computer to another but when
2:35:33
2 hours, 35 minutes, 33 seconds
the message is received on this computer which application do I send this message to Whatsapp Google Chrome or what that
2:35:41
2 hours, 35 minutes, 41 seconds
is done by whom transport layer okay sound good
2:35:50
2 hours, 35 minutes, 50 seconds
cool so it's sort of like providing it pro it's providing us an abstraction okay we talked about
2:35:57
2 hours, 35 minutes, 57 seconds
abstraction a lot so that's basically about it okay for example you are you and your friends live in different countries okay you send your friend a
2:36:06
2 hours, 36 minutes, 6 seconds
box okay so you will send your box the Box you will send the package for your friend this is the Box this you will
2:36:15
2 hours, 36 minutes, 15 seconds
send first to your ker company courier company in your or country and then this cier company will send it over to
2:36:23
2 hours, 36 minutes, 23 seconds
another courier company of another country courier company of another country and that courier company
2:36:31
2 hours, 36 minutes, 31 seconds
in that same country will send the box to your friend okay send the box to your
2:36:42
2 hours, 36 minutes, 42 seconds
friend this is you so this is transport layer
2:36:50
2 hours, 36 minutes, 50 seconds
transport layer this is Network layer from one device to another device
2:37:00
2 hours, 37 minutes
data transferred it it uses the network layer but within the same devices okay within this device and
2:37:07
2 hours, 37 minutes, 7 seconds
within this device that is happening on transport layer okay so transport layer only works
2:37:16
2 hours, 37 minutes, 16 seconds
with like first it's working on its own application then it trans then it it's basically giving the data to the network layer okay I'm an application I put
2:37:24
2 hours, 37 minutes, 24 seconds
WhatsApp in the message and then that transport layer basically will give it to network layer like hey this is the message please give it to my friend
2:37:32
2 hours, 37 minutes, 32 seconds
Network layer to network layer will be transferred to your friend's phone and then your friend's phones Network layer will transport the data back to
2:37:39
2 hours, 37 minutes, 39 seconds
transport layer which in turn will give it back to your WhatsApp application okay so that's basically about it okay
2:37:49
2 hours, 37 minutes, 49 seconds
now ask where is this transport layer if you want to visualize this where does it locate where is it located so on your devices right on your end systems
2:37:57
2 hours, 37 minutes, 57 seconds
computers or whatever that is where transport layer is okay so transport layer has some protocols we've already talked about
2:38:05
2 hours, 38 minutes, 5 seconds
this we have talked about TCP and UDP okay so TCP is basically um you know um
2:38:12
2 hours, 38 minutes, 12 seconds
uh it handles uh like uh 100% of like data can be sent like if something is missing if some data is like if you want
2:38:19
2 hours, 38 minutes, 19 seconds
want like entire data to be sent we talked about what TCP is already um and in the order the data will be sent and everything in UDP that's not the case
2:38:28
2 hours, 38 minutes, 28 seconds
data data that is being sent may not be in order some data packets will be lost things like that okay so let's look into
2:38:35
2 hours, 38 minutes, 35 seconds
what TCP is and what UDP is okay so these are some of the use cases of the transport layer so for example if you
2:38:43
2 hours, 38 minutes, 43 seconds
want to connect one application to another application if they're even across the world and stuff so you can visualize it in terms of transport layer
2:38:51
2 hours, 38 minutes, 51 seconds
um you can uh make sure like your entire data is being sent it also you know divides the datas into like when we talked about previously segments right
2:38:59
2 hours, 38 minutes, 59 seconds
so we we'll be looking into what segments are and how this data is being transferred we'll look into what is TCP IP and how does it make sure so
2:39:07
2 hours, 39 minutes, 7 seconds
basically if you're sending to your friend 15 files in different applications so Network layer will send those files but those different
2:39:16
2 hours, 39 minutes, 16 seconds
different files need to be sent to which particular application of your friend right that depends on transport layer okay now let's talk about how this thing
2:39:23
2 hours, 39 minutes, 23 seconds
happens Kunal we're talking about end systems we're talking about devices you are telling us that uh the role of Transport layer is to basically take the
2:39:31
2 hours, 39 minutes, 31 seconds
data like whatever you have received from Network to applications and from applications to network okay on the end system only how it travels on the air
2:39:40
2 hours, 39 minutes, 40 seconds
from one country to another that will be looking into Network layer but in in transport layer what is happening that um let's say you are sending a friend
2:39:49
2 hours, 39 minutes, 49 seconds
like a file over WhatsApp and you're video conferencing them on Skype and you're sending them an email also okay so
2:39:56
2 hours, 39 minutes, 56 seconds
you're sending your friend like there's a message okay there's a mail and there's
2:40:04
2 hours, 40 minutes, 4 seconds
a video call three things are happening with your friends at the same time this is all happening on your system okay this is all happening on
2:40:11
2 hours, 40 minutes, 11 seconds
your system now for your friend they also need to receive a message on their WhatsApp or whatever
2:40:20
2 hours, 40 minutes, 20 seconds
okay they need to receive an email or something or whatever like whatever you want to call it or a online file or something okay I can just call it a file
2:40:28
2 hours, 40 minutes, 28 seconds
you're sending a file let's say for example okay you're sending a file for example and you're video calling them as
2:40:35
2 hours, 40 minutes, 35 seconds
well so all of this data I know will be traveled through the internet how it travels on the internet that we'll look
2:40:42
2 hours, 40 minutes, 42 seconds
into later on but first let's focus on how you know our computers will determine
2:40:50
2 hours, 40 minutes, 50 seconds
that which type of how to send these three types of data to the network and how will our friend determine like when
2:40:59
2 hours, 40 minutes, 59 seconds
the network of your when your friend's device has gotten the data how will that determine which application to send which data we are sending data in a
2:41:08
2 hours, 41 minutes, 8 seconds
bundle right okay so this thing is known as multiplexing and this thing is known as D multiplexing so multiplexing is
2:41:16
2 hours, 41 minutes, 16 seconds
what multiplexing will allow us to send all all these messages and things to uh a lot of destinations so three
2:41:25
2 hours, 41 minutes, 25 seconds
messages we are sending to three three applications three destinations just via one medium okay for example you put
2:41:33
2 hours, 41 minutes, 33 seconds
something in a box you you are sending your friend uh cookies and a PlayStation and a mobile phone you put this in a box
2:41:40
2 hours, 41 minutes, 40 seconds
and you give your friend the Box okay so transport layer has a multiplexer you're sending all these
2:41:48
2 hours, 41 minutes, 48 seconds
three items in the multiplexer transport layer Multiplex
2:41:57
2 hours, 41 minutes, 57 seconds
okay transport layer Multiplex and this will pass it to the D
2:42:06
2 hours, 42 minutes, 6 seconds
multiplexer so one is multiplexer and one is D multiplexer so D Multiplex is just
2:42:15
2 hours, 42 minutes, 15 seconds
opposite of Multiplex obviously okay so applications will be sent to like here you have the D
2:42:22
2 hours, 42 minutes, 22 seconds
multiplexer and basically it will pass it to WhatsApp and your browser and your video call Skype or
2:42:29
2 hours, 42 minutes, 29 seconds
whatever okay so this is multiplexing this is Dem multiplexing as simple as that okay but how does it work
2:42:38
2 hours, 42 minutes, 38 seconds
internally how does it happen what is it that we use to refer to Applications tell me that what is it that we use to refer
2:42:47
2 hours, 42 minutes, 47 seconds
applications what is it we use to refer machines IP addresses and what is it that we use to refer applications I
2:42:54
2 hours, 42 minutes, 54 seconds
covered this already port numbers okay we also covered about sockets what are sockets sockets are
2:43:02
2 hours, 43 minutes, 2 seconds
just like some some sort of like a connection between two application like a Gateway okay between the application and
2:43:09
2 hours, 43 minutes, 9 seconds
the what network that's how applications are connected okay so if this message
2:43:17
2 hours, 43 minutes, 17 seconds
application wants to send something to another message application it will give it to the socket it will give it to the socket
2:43:25
2 hours, 43 minutes, 25 seconds
over here this will give it to sockets this will also have sockets over
2:43:32
2 hours, 43 minutes, 32 seconds
here and these sockets have port numbers okay so you all know that these
2:43:40
2 hours, 43 minutes, 40 seconds
things are traveling in packets okay data travels in packets we all know that we have covered this previously okay so
2:43:47
2 hours, 43 minutes, 47 seconds
data travels in packets we know
2:43:54
2 hours, 43 minutes, 54 seconds
that okay so the transport layer will attach transport
2:44:02
2 hours, 44 minutes, 2 seconds
layer will attach these port numbers these socket port
2:44:10
2 hours, 44 minutes, 10 seconds
numbers that's why it knows where the application is coming from and to which application do you need to send the
2:44:17
2 hours, 44 minutes, 17 seconds
data okay cool okay okay and there's one more thing transport layer another point I want to add over here is that
2:44:25
2 hours, 44 minutes, 25 seconds
transport layer also takes care of concession
2:44:32
2 hours, 44 minutes, 32 seconds
control congestion control congestion is what congestion is traffic you know when so many cars align or something and so
2:44:41
2 hours, 44 minutes, 41 seconds
many people are there and the the the space is limited the entry is limited but so many people are trying to get in then there's like a lot of congestion
2:44:49
2 hours, 44 minutes, 49 seconds
so that's basically what it means so in transport layer happens in like Network layer also in transport layer also so for example network uh has a lower
2:44:59
2 hours, 44 minutes, 59 seconds
bandwidth but you are sending data packets so rapidly some packets will get lost and stuff this is known as
2:45:05
2 hours, 45 minutes, 5 seconds
congestion okay so basically it will try to like uh send the packets at like a slower rate and things like that it's
2:45:13
2 hours, 45 minutes, 13 seconds
going to take note of all these other things okay sound good so it uses some algorithms for it you can check it out congestion control algorithms since
2:45:22
2 hours, 45 minutes, 22 seconds
we're talking about transport layer so this will be built into which which protocol transport layer protocol like
2:45:28
2 hours, 45 minutes, 28 seconds
TCP and UDP so here it's saying that uh congestion
2:45:37
2 hours, 45 minutes, 37 seconds
control algorithms built in
2:45:45
2 hours, 45 minutes, 45 seconds
TCP okay cool okay let's move forward now we all have a good understanding of Transport layer now okay you send the
2:45:53
2 hours, 45 minutes, 53 seconds
data to network layer and in your friend's house Network layer will send the data to transport layer so transport layer to network layer and then the data
2:46:01
2 hours, 46 minutes, 1 second
travels through the world then Network layer to transport layer gave a very nice understanding to you okay let's think about your friend let's think
2:46:09
2 hours, 46 minutes, 9 seconds
about your friend you are sending this data from Network layer to network layer sometimes it may be possible that data
2:46:16
2 hours, 46 minutes, 16 seconds
gets corrupted in between Maybe possible nothing is perfect right we all have flaws so sometimes it may be happen like
2:46:24
2 hours, 46 minutes, 24 seconds
get data gets corrupted you are sending data into what you're sending data in segments we have looked we have looked at this term called segments before
2:46:31
2 hours, 46 minutes, 31 seconds
right so in say data packets for example okay so these B data packets can be lost for example right or something like uh
2:46:38
2 hours, 46 minutes, 38 seconds
you're sending some files um and you're sending a file obviously you know can't send an entire file so you send the file in packets some for example one are you
2:46:48
2 hours, 46 minutes, 48 seconds
sending an a file and something that you said obviously you want it to arrive in that order only how would it would it be that something you said previously
2:46:56
2 hours, 46 minutes, 56 seconds
arrives first and something you said said like much earlier arrives at last okay if I'm saying hi my name is
2:47:04
2 hours, 47 minutes, 4 seconds
Kunal and your friend gets received it something like this my high Kunal name
2:47:11
2 hours, 47 minutes, 11 seconds
is that is also not cool right so what you want you want your friend to get all the data if something is lost you want to know like okay I was sending this
2:47:20
2 hours, 47 minutes, 20 seconds
message and these packets were lost due to some error or whatever and uh you also want to make sure that your data that is you're sending to your friend is
2:47:28
2 hours, 47 minutes, 28 seconds
in order okay so how do we work with this transport layer protocols they take care of this using something called
Chapter 27: Checksum
2:47:36
2 hours, 47 minutes, 36 seconds
check sums check
2:47:44
2 hours, 47 minutes, 44 seconds
sums okay sound good so what is a check sum so basically you are sending some data to your friend Che some you can
2:47:51
2 hours, 47 minutes, 51 seconds
imagine is like a number okay a random number or whatever so basically you have your computer you're sending a data to
2:47:58
2 hours, 47 minutes, 58 seconds
your friend data to your friend using this data you will calculate a particular string value or
2:48:05
2 hours, 48 minutes, 5 seconds
something okay that we'll call check sum okay then your friend receives this
2:48:12
2 hours, 48 minutes, 12 seconds
data friend receives the data so friend gets the data and since the check sum was calculated using this data and
2:48:21
2 hours, 48 minutes, 21 seconds
basically this data will have a check sum associated with it this this one only check sum so now when you're sending this data
2:48:30
2 hours, 48 minutes, 30 seconds
over to your friend you will attach the check sum that you calculated in your home and when your friend receives the
2:48:37
2 hours, 48 minutes, 37 seconds
data they will also calculate the check sum using the same algorithm if the value is different then
2:48:45
2 hours, 48 minutes, 45 seconds
something is gone wrong if the value is same then it's cool okay sound good that is basically about
2:48:53
2 hours, 48 minutes, 53 seconds
it there's one more thing that um uh this was about like if correct
Chapter 28: Timers
2:49:00
2 hours, 49 minutes
data is given or not or whatever okay and uh like if data is not being corrupted or something like that okay but you have
2:49:09
2 hours, 49 minutes, 9 seconds
to also understand that uh what if the segments are being like you know the the the the packets and data packets and things like segments you're talking
2:49:16
2 hours, 49 minutes, 16 seconds
about what if they get lost or something how would I know that my packets have received to my friend something known as
2:49:26
2 hours, 49 minutes, 26 seconds
timers ERS okay so what will happen you are at
2:49:33
2 hours, 49 minutes, 33 seconds
here you are with your friend like you have you have a computer over here this is this is
2:49:43
2 hours, 49 minutes, 43 seconds
you okay and this is your friend
2:49:53
2 hours, 49 minutes, 53 seconds
okay cool and basically you are trying to send you are trying to send your friend a a data data packet okay so data
2:50:02
2 hours, 50 minutes, 2 seconds
travels in packets so let's say first packet is being sent to your friend okay your friend is going to be
2:50:09
2 hours, 50 minutes, 9 seconds
like um okay I got the packet and your send will send you like a confirmation but when you send your packet to a
2:50:16
2 hours, 50 minutes, 16 seconds
friend you will start the timer okay you will start the
2:50:28
2 hours, 50 minutes, 28 seconds
timer your friend be like okay I have gotten the packet I got it so now you will know
2:50:36
2 hours, 50 minutes, 36 seconds
okay my friend got the packet now let's say you send another packet over here and let's say in between only this packet got lost in between only it got
2:50:45
2 hours, 50 minutes, 45 seconds
lost obviously timer will be started and when you receive it back back timer end timer end when you send it again
2:50:54
2 hours, 50 minutes, 54 seconds
timer start again so my timer is running this will never receive over here and after some time since it never
2:51:02
2 hours, 51 minutes, 2 seconds
receive your friend will not be able to say hey I got the packet back so hence timer will
2:51:11
2 hours, 51 minutes, 11 seconds
expire and you will know that this packet two was not sent okay sound good so this is known as
2:51:20
2 hours, 51 minutes, 20 seconds
timer retransmission timer okay it's known as retransmission
2:51:29
2 hours, 51 minutes, 29 seconds
timer sound good all right imagine that you are sending
2:51:37
2 hours, 51 minutes, 37 seconds
something to your friend okay so you are sending please
2:51:47
2 hours, 51 minutes, 47 seconds
don't get confused now with t CP or UDP or whatever what are transport layer protocols what are HTTP what is application layer protocol everything I
2:51:54
2 hours, 51 minutes, 54 seconds
explain to you in details with real world examples so you send let's say data packet number one okay your friend is
2:52:02
2 hours, 52 minutes, 2 seconds
going to you start the timer your friend is going to like hey I got it you end the timer then you send it again packet
2:52:08
2 hours, 52 minutes, 8 seconds
number two you will start the timer your friend will let's say send you back again but let's say this friend does not
2:52:15
2 hours, 52 minutes, 15 seconds
tell you like while it's receiving back like hey I got packet number two so you have not received that and timer will let's say
2:52:23
2 hours, 52 minutes, 23 seconds
expire for me I don't know now that if they received it or not so I'll treat it as that they did not receive packet
2:52:31
2 hours, 52 minutes, 31 seconds
number two I'll try to send another packet number two now this person has two packet number twos
2:52:40
2 hours, 52 minutes, 40 seconds
duplicate duplicate packets are available are you able to understand what is happening okay how do we solve this
2:52:48
2 hours, 52 minutes, 48 seconds
problem problem we solve this problem using sequence
2:52:58
2 hours, 52 minutes, 58 seconds
numbers sequence numbers okay so unique like
2:53:06
2 hours, 53 minutes, 6 seconds
identification uh like a value number will be provided every every packet every segment will get it okay so that's
2:53:13
2 hours, 53 minutes, 13 seconds
why how we can identify okay you got a segment with number two uh number two was already present with us so it's a
2:53:20
2 hours, 53 minutes, 20 seconds
duplicate one all right okay so that was basically about how it works so we looked into detail about HTTP and like
2:53:28
2 hours, 53 minutes, 28 seconds
application layer and what transport layer is what it does how it does it only thing we need to look now is uh we
2:53:35
2 hours, 53 minutes, 35 seconds
need to look at uh in details uh about TCP uh about UDP about uh IP addresses
2:53:42
2 hours, 53 minutes, 42 seconds
we haven't looked into that much um like obviously we'll look at we'll look at that uh in the network layer
2:53:49
2 hours, 53 minutes, 49 seconds
and uh the data link layer and the physical layer is nothing so it's it's just like physical devices so not much to cover over there uh but this is the
2:53:58
2 hours, 53 minutes, 58 seconds
only thing remaining right now okay so let's start with uh protocols deep diving into protocols now uh what are
Chapter 29: UDP (User Datagram Protocol)
2:54:06
2 hours, 54 minutes, 6 seconds
the transport layer protocols we are still on transport layer so what are the transport layer protocols TCP and UDP what are the
2:54:14
2 hours, 54 minutes, 14 seconds
application layer protocols HTTP and stuff right right um what is
2:54:20
2 hours, 54 minutes, 20 seconds
the um Network layer protocol IP Internet Protocol uh so we'll uh we'll
2:54:27
2 hours, 54 minutes, 27 seconds
take a look at all of these okay cool first let's start with the um transport
2:54:34
2 hours, 54 minutes, 34 seconds
layer protocol so since we are transport layer we know where transport layer works and let's look into UDP now
2:54:43
2 hours, 54 minutes, 43 seconds
UDP UDP stands for user datagram protocol is it recording
2:54:56
2 hours, 54 minutes, 56 seconds
yes okay let's learn about user datagram protocol so what is UCP UDP it's
2:55:06
2 hours, 55 minutes, 6 seconds
basically pretty simple it's uh the transport layer protocol right and uh it basically uh uh you all know what it is
2:55:13
2 hours, 55 minutes, 13 seconds
like it's used to transport you know like data in the transport layers like from Network to transport layer and from transport layer to network right but the
2:55:23
2 hours, 55 minutes, 23 seconds
problem is that uh here your data may not be
2:55:29
2 hours, 55 minutes, 29 seconds
delivered okay data may or may not be
2:55:39
2 hours, 55 minutes, 39 seconds
delivered okay data may change on the way data may change on the way
2:55:48
2 hours, 55 minutes, 48 seconds
okay data may not be in order when your friend receives the data data may not be
2:55:56
2 hours, 55 minutes, 56 seconds
in order so this is the problem so obviously if you want to send some documents emails or whatever do these
2:56:03
2 hours, 56 minutes, 3 seconds
Technologies use UDP then no if they use UDP then your email may come in different order or some data will be lost or whatever important files will be
2:56:11
2 hours, 56 minutes, 11 seconds
you know corrupted or something like that right sound good
2:56:18
2 hours, 56 minutes, 18 seconds
all right so let's see how it happens so basically uh it is a connectionless
2:56:27
2 hours, 56 minutes, 27 seconds
protocol connection less protocol okay means no connection will
2:56:36
2 hours, 56 minutes, 36 seconds
be established between the two computers and it will still send like the data in TCP it will be like hey let me make sure there's a connection between these two
2:56:44
2 hours, 56 minutes, 44 seconds
and after that I will send data which I'll look into later on okay connectionless protocol okay and this thing that I mentioned over here this
2:56:53
2 hours, 56 minutes, 53 seconds
thing this thing to check something so check sum is used for what to to check whether the data has been corrupted or
2:57:00
2 hours, 57 minutes
not okay UDP uses this so UDP uses this UDP uses check sums
2:57:08
2 hours, 57 minutes, 8 seconds
UDP uses check sums okay so you will know whether the
2:57:17
2 hours, 57 minutes, 17 seconds
data has been corrupted or not but UDP will not do anything about it okay it's corrupted there's an error okay no problem it is what is it what it
2:57:25
2 hours, 57 minutes, 25 seconds
is okay so let's look at this particular header and uh this particular like uh
2:57:31
2 hours, 57 minutes, 31 seconds
the packet that we'll be sending so UDP packet what does it look like uh
2:57:40
2 hours, 57 minutes, 40 seconds
previously we mentioned port numbers um obviously if you're talking about like transport layer in transport layer we have port numbers where are those we
2:57:48
2 hours, 57 minutes, 48 seconds
mentioned it somewhere over here sockets and sockets have uh transport layer will attach these socket port numbers it is
2:57:57
2 hours, 57 minutes, 57 seconds
written over here okay so every data packet will have a port number your port number and your friend's port number
2:58:06
2 hours, 58 minutes, 6 seconds
so your Source port number and your uh destination port
2:58:15
2 hours, 58 minutes, 15 seconds
number destination port number in a packet will be available okay the length of the packet
2:58:24
2 hours, 58 minutes, 24 seconds
the length of this datagram it's known as datagram length of data gr will also
2:58:30
2 hours, 58 minutes, 30 seconds
be added okay and what else check sum check sum will also be added so
2:58:38
2 hours, 58 minutes, 38 seconds
these are all the additional things that will be added and then obviously your data will be added what data you are sending okay this is what is added if
2:58:46
2 hours, 58 minutes, 46 seconds
you want to check the size of this then uh this is 2 bytes um this is also 2 bytes 2 bytes 2
2:58:54
2 hours, 58 minutes, 54 seconds
bytes and the data is also I believe uh 2 bytes okay so 1 2 3 4 this is total
2:59:01
2 hours, 59 minutes, 1 second
eight bytes and then you have your data oh no data cannot data is not two bytes two bytes is very less um data is like
2:59:09
2 hours, 59 minutes, 9 seconds
if you're talking about the total size right so let's see total size total size is equal to 2 to^ 16 and
2:59:18
2 hours, 59 minutes, 18 seconds
uh this particular thing okay the the header this is known as the header something that is attached to you this
2:59:26
2 hours, 59 minutes, 26 seconds
is header uh this is 8
2:59:32
2 hours, 59 minutes, 32 seconds
bytes okay um so total size of data is 2
2:59:39
2 hours, 59 minutes, 39 seconds
to^ 16 - 8 which is equal to what 6,000 65,000
2:59:46
2 hours, 59 minutes, 46 seconds
something these many bytes this is the size of the data that you can send in one
2:59:53
2 hours, 59 minutes, 53 seconds
packet Okay cool so that's basically how it happens same thing we mentioned previously that's it these all things we
3:00:02
3 hours, 2 seconds
mentioned okay that was it no initial connection or whatever just like we mentioned previously it happens like that same check some Theory okay so why
3:00:12
3 hours, 12 seconds
do we use it because UDP is like faster right because it's not like always checking for hey did you get the data or
3:00:18
3 hours, 18 seconds
whatever okay sound good
3:00:25
3 hours, 25 seconds
cool all right so that was about UDP and it's a lot lot uh faster that's why we that's why we use it and that's uh
3:00:33
3 hours, 33 seconds
pretty much about it good and when we talk about uh DNS uh
3:00:42
3 hours, 42 seconds
use cases of UDP use cases um it's very
3:00:49
3 hours, 49 seconds
fast let me just write some use cases um video conferencing apps video conferencing apps and the DNS thing we
3:00:58
3 hours, 58 seconds
talked about previously this also uses UDP because it's fast okay
3:01:07
3 hours, 1 minute, 7 seconds
gaming gaming also uses UDP okay cool okay you can actually use a command to see all these data packets
3:01:16
3 hours, 1 minute, 16 seconds
that are coming in and out of your computer okay so you can say TCP dump and I can say only give me five packets okay if
3:01:23
3 hours, 1 minute, 23 seconds
you remove five this my- C5 then it will show you all like that are coming okay I I want I only want to see
3:01:31
3 hours, 1 minute, 31 seconds
five so here you go five packets captured and uh there you go it has all
3:01:38
3 hours, 1 minute, 38 seconds
the information see udb packet okay sequence is there length is there and so many other things uh IP is
3:01:47
3 hours, 1 minute, 47 seconds
there AWS it's coming from somewhere right um that's pretty much about it okay so
3:01:56
3 hours, 1 minute, 56 seconds
these are the ec2 instances these are ec2 instance we'll talk more about these things later right uh cloud computing
3:02:03
3 hours, 2 minutes, 3 seconds
later in the course okay so don't worry about that okay so that was UDP now let's talk about TCP protocol so TCP
Chapter 30: TCP (Transmission Control Protocol)
3:02:10
3 hours, 2 minutes, 10 seconds
means transmission control protocol uh we have already looked at it in brief and we're talking about HTTP so HTTP
3:02:16
3 hours, 2 minutes, 16 seconds
uses TCP right and we we know like let's talk about TCP I'll write I'll I'll make a new page for this okay because this is an important topic it's also asked in
3:02:26
3 hours, 2 minutes, 26 seconds
interviews quite a lot explain TCP how it works okay transmission control protocol uh
3:02:36
3 hours, 2 minutes, 36 seconds
TCP transmission control protool
3:02:51
3 hours, 2 minutes, 51 seconds
transmission control protocol we already looked at UDP and now it's time to look at uh TCP so we know that it's being
3:02:58
3 hours, 2 minutes, 58 seconds
used in sttp and it's like very uh you know uh like the data we have is uh you know is stays with us so what do it what
3:03:07
3 hours, 3 minutes, 7 seconds
does it do like what is the use case of of TCP obviously uh we talk about TCP so it's on the transport layer so we know it's from uh taking the data from your
3:03:16
3 hours, 3 minutes, 16 seconds
transport to your network and from Network to your transport layer okay so basically it allows us to do that it's
3:03:23
3 hours, 3 minutes, 23 seconds
at like the transport layer protocol okay transport layer protocol it does the same thing
3:03:31
3 hours, 3 minutes, 31 seconds
that UDP does but differently okay when you um uh you know when you get the data when you get the
3:03:39
3 hours, 3 minutes, 39 seconds
data in the transport layer from where application layer so you create data segments okay so application layer sends
3:03:47
3 hours, 3 minutes, 47 seconds
data application layer sends lot of raw data
3:03:53
3 hours, 3 minutes, 53 seconds
let's say sends lots of raw data and
3:04:00
3 hours, 4 minutes
TCP segments this data means divide it in chunks or something divide in
3:04:09
3 hours, 4 minutes, 9 seconds
chunks add headers you know check sums so on and so
3:04:14
3 hours, 4 minutes, 14 seconds
forth all these are things okay it may also collect the
3:04:24
3 hours, 4 minutes, 24 seconds
data from Network layer uh when Network layer dist for
3:04:35
3 hours, 4 minutes, 35 seconds
example you have a data uh and transport layer passes the N data to what layer Network layer Network layer May divide
3:04:42
3 hours, 4 minutes, 42 seconds
that data into more smaller chunks so at the receiving end of your friend those more smaller chunks will be put into one
3:04:50
3 hours, 4 minutes, 50 seconds
okay check video I can't write this so have you can
3:04:58
3 hours, 4 minutes, 58 seconds
check this video when you look at notes okay sound good so it also provides one more thing which is
3:05:05
3 hours, 5 minutes, 5 seconds
congestion control that we talked about previously congestion control
3:05:13
3 hours, 5 minutes, 13 seconds
okay sound good cool it's takes care of two things takes care
3:05:23
3 hours, 5 minutes, 23 seconds
of um when data does not arrive okay so it will work with that
3:05:33
3 hours, 5 minutes, 33 seconds
sometimes data may not be delivered so in that case we have to work with it and also rearranges and maintains the order
3:05:41
3 hours, 5 minutes, 41 seconds
basically okay maintains the order of data maintains the order of data and we
3:05:50
3 hours, 5 minutes, 50 seconds
looked at it previously how it does it using sequence number Okay
3:05:57
3 hours, 5 minutes, 57 seconds
cool so TCP is pretty pretty awesome we can use it in various various places like we can transfer some PDFs you know
3:06:05
3 hours, 6 minutes, 5 seconds
um email and uh the HTTP uses it so web browsing and uh so many other things like email and email service and things
3:06:13
3 hours, 6 minutes, 13 seconds
like that okay so what are the email application layer protocols MTP right pop IMAP we talked about these
3:06:20
3 hours, 6 minutes, 20 seconds
previously so these application layer protocols use which transport layer protocol
3:06:27
3 hours, 6 minutes, 27 seconds
TCP okay what are some of the features
3:06:35
3 hours, 6 minutes, 35 seconds
features features uh it's uh it's pretty straightforward so basically UDP was connectionless this is connection
3:06:43
3 hours, 6 minutes, 43 seconds
oriented means first a connection has to be
3:06:50
3 hours, 6 minutes, 50 seconds
established and then you can send data okay cool it is
3:06:58
3 hours, 6 minutes, 58 seconds
also um you know um uh it also provides us um like
3:07:08
3 hours, 7 minutes, 8 seconds
um error control okay so error control we talked about this obviously error
3:07:15
3 hours, 7 minutes, 15 seconds
control okay con congestion control we've talked about this also congestion
3:07:23
3 hours, 7 minutes, 23 seconds
control right um it also is there's one more thing like uh bidirectional okay I mean like duplex
3:07:31
3 hours, 7 minutes, 31 seconds
full duplex full duplex so what do we mean by full duplex basically this means that uh
3:07:39
3 hours, 7 minutes, 39 seconds
you are two computers connected to each other you can send one file from computer a to computer B computer B can
3:07:47
3 hours, 7 minutes, 47 seconds
then send another file like this or you both can send files
3:07:54
3 hours, 7 minutes, 54 seconds
simultaneously okay sound good cool notice something
3:08:03
3 hours, 8 minutes, 3 seconds
that using TCP there can only be two end points like this okay so you cannot like send one
3:08:10
3 hours, 8 minutes, 10 seconds
message to 10 computers no they they all will be having their own TCP connection one TCP connection only two between two
3:08:18
3 hours, 8 minutes, 18 seconds
computers okay so that's basically about it okay so let's talk about this connection thing can you're saying it first
3:08:26
3 hours, 8 minutes, 26 seconds
establishes a connection between two computers and then it transfers data how this connection happens so you already know about like data segments this is
3:08:34
3 hours, 8 minutes, 34 seconds
the one that looks like for uh UDP for TCP it's a little bit more uh complex okay so if you want to look into like
3:08:42
3 hours, 8 minutes, 42 seconds
the details of it you can uh you can check it out uh you know the research papers for that so I won't be going into much details of it because it has a lot
3:08:50
3 hours, 8 minutes, 50 seconds
of things obviously if it's connection oriented then obviously lot more details are required but basically it has the same thing like the source and the
3:08:57
3 hours, 8 minutes, 57 seconds
destination port number the data obviously will be there um it will add a sequence number and an acknowledgement
3:09:05
3 hours, 9 minutes, 5 seconds
number okay and obviously your check sum and stuff so the sequence number and acknowledgement number are the two two different things that we have looked
Chapter 31: 3-Way handshake
3:09:13
3 hours, 9 minutes, 13 seconds
into right now so what does it mean so basically first I will tell you verbally then I'll draw the diagram what happens is that the client will request the
3:09:22
3 hours, 9 minutes, 22 seconds
server you will request your friend's computer hey I want to establish a connection with you then your friend server will respond back to you you're
3:09:31
3 hours, 9 minutes, 31 seconds
like yeah sure I want to establish a connection with you too and then you will respond back to your friend okay cool uh I accepted and uh connection
3:09:39
3 hours, 9 minutes, 39 seconds
established three-way handshake this is known as three-way handshake three-way handshake very important concept and
3:09:46
3 hours, 9 minutes, 46 seconds
also asked in interviews three-way handshake okay your computer let's say
3:09:54
3 hours, 9 minutes, 54 seconds
this is the client this is the server okay so you will send a connection request and uh in your
3:10:03
3 hours, 10 minutes, 3 seconds
connection request you're going to send it to your server you will send the connection request you are going to send
3:10:10
3 hours, 10 minutes, 10 seconds
a flag which is known as a synchronization flag this is a flag that you send synchron ization flag it means that
3:10:19
3 hours, 10 minutes, 19 seconds
a new connection is being established this is nothing this is just like a flag a value inside the header that's it don't ask me what a header is
3:10:27
3 hours, 10 minutes, 27 seconds
okay we already covered over here this thing okay cool the server will like oh I have got a new sin flag what do we do it also
3:10:36
3 hours, 10 minutes, 36 seconds
sends a sequence number so we know it's in order so sin flag and a sequence number will be sent okay let's
3:10:44
3 hours, 10 minutes, 44 seconds
say that the sequence number is something like 32 random number okay so sequence numbers are random numbers uh the
3:10:52
3 hours, 10 minutes, 52 seconds
question is why because um if the sequence number were not random then it would make it very easy to guess and
3:11:00
3 hours, 11 minutes
anyone would be able to make connection with the server and hackers could uh you know uh take advantage of this so security purposes sequence numbers are
3:11:09
3 hours, 11 minutes, 9 seconds
random okay um server will be like uh okay sure I have got your sin flag and I will send you a m
3:11:18
3 hours, 11 minutes, 18 seconds
flag it will also have a sequence number of random something
3:11:25
3 hours, 11 minutes, 25 seconds
like 85 not I think it takes the sequence flag it takes the sequence number from the client does some
3:11:35
3 hours, 11 minutes, 35 seconds
mathematical calculations on it yeah do some maths on
3:11:42
3 hours, 11 minutes, 42 seconds
32 and that will give you another number that's going to be its sequence number
3:11:49
3 hours, 11 minutes, 49 seconds
okay so that's how it works with its sequence number and then client will be like okay um I have gotten it and I
3:11:56
3 hours, 11 minutes, 56 seconds
acknowledge it now client will again send the acknowledgement flag this will also send sin flag because it is also starting a new connection and then
3:12:04
3 hours, 12 minutes, 4 seconds
acknowledgement and uh the sequence number okay example let's say this is
3:12:13
3 hours, 12 minutes, 13 seconds
56 okay so it will send a sequence number first it was 32 the next time it sends a request it will be 32 + 1
3:12:22
3 hours, 12 minutes, 22 seconds
sequence number will be 33 okay sound
3:12:30
3 hours, 12 minutes, 30 seconds
good cool it will also send an acknowledgement number there's a sequence number there's also an acknowledgement number acknowledgement
3:12:38
3 hours, 12 minutes, 38 seconds
number is equal to sequence number plus one previous sequence number + one so 33 and here acknowledgement number is going
3:12:47
3 hours, 12 minutes, 47 seconds
to be equal to what previous sequence number which was 56 um +
3:12:54
3 hours, 12 minutes, 54 seconds
1 okay 57 that's it and then the connection will be established and then they will be talking to each other that's
3:13:03
3 hours, 13 minutes, 3 seconds
basically how it works this is a three-way handshake if you want to look into details what this header looks like I already mentioned it contains like the acknowledgement flag sin flag there are
3:13:12
3 hours, 13 minutes, 12 seconds
so many other flags as well that you can check the you know internet for more more information uh there's the reset flag is there
3:13:19
3 hours, 13 minutes, 19 seconds
there's a finish flag is there right so all these flags are available over there so you can check it out and the check
3:13:26
3 hours, 13 minutes, 26 seconds
sum is also available in this um which basically works in the same way and that's
3:13:33
3 hours, 13 minutes, 33 seconds
it okay so that was about TCP and I believe that was about transport layer also uh so that's it and now let's look
Chapter 32: TCP (Network Layer)
3:13:40
3 hours, 13 minutes, 40 seconds
into the network layer Network layer cool by the way if you're
3:13:51
3 hours, 13 minutes, 51 seconds
enjoying the tutorial make sure you like share and subscribe and comment and share with your friends it will mean a lot okay so we know that application layers sends the data to trans transport
3:14:00
3 hours, 14 minutes
layer so the data that is in the transport layer so I'll just write it down over here in the transport layer the data we have is
3:14:09
3 hours, 14 minutes, 9 seconds
in segments okay in the network layer the dat we have the data it
3:14:18
3 hours, 14 minutes, 18 seconds
travels in the form of packets and then the data link layer the data link layer has uh
3:14:27
3 hours, 14 minutes, 27 seconds
frames we we'll look on into all of these packets uh sorry uh segments we have already looked into now it's time for packets and Frames okay so what
3:14:36
3 hours, 14 minutes, 36 seconds
works at the network layer routers here we work with
3:14:42
3 hours, 14 minutes, 42 seconds
routers so here we work with
3:14:49
3 hours, 14 minutes, 49 seconds
routers okay we've already covered what routers are so basically this is the part where your data actually travels
3:14:57
3 hours, 14 minutes, 57 seconds
from one place to another be that like across the world okay so that is pretty much about it and let's say how let's
3:15:05
3 hours, 15 minutes, 5 seconds
see how we can uh how we can do that okay so let's see how it happens so when we're talking about routers let's say so many routers our router and everyone is
3:15:13
3 hours, 15 minutes, 13 seconds
connected together and you are let's say over here let me just uh erase this thing um just give me a
3:15:21
3 hours, 15 minutes, 21 seconds
second and let's see if we are over here somewhere okay um okay so you are over here your friend
3:15:30
3 hours, 15 minutes, 30 seconds
is over here point a point B you have to send data from computer a to computer B okay so many routers are connected in
3:15:38
3 hours, 15 minutes, 38 seconds
between so many routers are connected to each other so many routers are connected like this
3:15:47
3 hours, 15 minutes, 47 seconds
something like this okay many routers are connected to each other sound good
3:15:53
3 hours, 15 minutes, 53 seconds
this is basically about it so what happens is that uh this entire internet
3:16:01
3 hours, 16 minutes, 1 second
thing okay just like like the global global internet um every single router that you see over
3:16:10
3 hours, 16 minutes, 10 seconds
here has its own network address so every device we know has its own what
3:16:18
3 hours, 16 minutes, 18 seconds
IP address Mac address so these also have their own network address so Network address basically means that um
3:16:27
3 hours, 16 minutes, 27 seconds
it basically allows us to send these like data packets so if you're sending a data packet over here you send it to
3:16:35
3 hours, 16 minutes, 35 seconds
this one uh Network 1 for example so what this network 1 is going to do it's
3:16:42
3 hours, 16 minutes, 42 seconds
going to check in its routing table okay it's going to check in its uh in
3:16:49
3 hours, 16 minutes, 49 seconds
its routing table or forwarding table forwarding table is a part of a routing table uh that basically
3:16:56
3 hours, 16 minutes, 56 seconds
consists of every destination address okay so for example let's let me
3:17:05
3 hours, 17 minutes, 5 seconds
explain it to you I know it's a little bit confusing but let's see so what does a packet contain let's first look into that so it will contain the network
3:17:14
3 hours, 17 minutes, 14 seconds
layer address of the destination it will contain the network layer address of the person who is sending it and what
3:17:21
3 hours, 17 minutes, 21 seconds
information you want it to send okay so when you send your packet over here you send your packet from here to here this
3:17:30
3 hours, 17 minutes, 30 seconds
will check this router will check it will check its forwarding table it like oh I have received this packet uh and
3:17:38
3 hours, 17 minutes, 38 seconds
this packet needs to be at this particular location let me just check my forwarding table real quick let me check
3:17:45
3 hours, 17 minutes, 45 seconds
my forwarding table oh this uh this particular destination it's uh somewhere around East so it will send it over here
3:17:53
3 hours, 17 minutes, 53 seconds
like this this is known as forwarding table so routing table forwarding table don't get confused in this this is known as
3:18:01
3 hours, 18 minutes, 1 second
hop by hop forwarding hop by hop forwarding hopping routers to routers
3:18:11
3 hours, 18 minutes, 11 seconds
until it reaches the correct router okay so this will be like okay I have received N1 will like N1 router uh
3:18:18
3 hours, 18 minutes, 18 seconds
it will be like hey I have received a packet is this packet for me it's going to be like a packet is going to be like no it's not it's actually for some other destination uh Network layer address so
3:18:28
3 hours, 18 minutes, 28 seconds
like oh okay uh then let me see where that is in my forwarding table you're like okay let me just check it and then it will move
3:18:35
3 hours, 18 minutes, 35 seconds
ahead okay sound good so this forwarding and these routing tables actually live inside your
3:18:44
3 hours, 18 minutes, 44 seconds
routers okay sound good cool okay so forwarding table comes inside a routing table a routing table
3:18:52
3 hours, 18 minutes, 52 seconds
may have multiple paths so if you want to reach uh Point number c okay how do you reach Point number c you can go from
3:19:00
3 hours, 19 minutes
here from here from here all these information will be available in routing table then what is forwarding table forwarding table only contains One path
3:19:09
3 hours, 19 minutes, 9 seconds
okay it will be like okay you want to go from here to here check it so it's a much much more faster way okay and it's uh it exists inside
3:19:18
3 hours, 19 minutes, 18 seconds
your routers these forwarding tables and stuff okay so forwarding table it's just a data
3:19:25
3 hours, 19 minutes, 25 seconds
structure okay okay so it will be like hey please send it the data over here they like okay let me check if this data is for me it will be like no it's not
3:19:33
3 hours, 19 minutes, 33 seconds
okay send it to your you know checking the forwarding table it like okay forwarding table is saying that this particular IP address lies somewhere
3:19:40
3 hours, 19 minutes, 40 seconds
over here it will send it here then it will send like let's say if these were connected Also let's say if these were connected also will send here it will
3:19:49
3 hours, 19 minutes, 49 seconds
send it here and data will be then received okay so every single router
3:19:55
3 hours, 19 minutes, 55 seconds
will have its own network layer address okay every device has its own Mac address but when you talk about the
3:20:05
3 hours, 20 minutes, 5 seconds
network interface um it also has its own like some some some logical address are being being
3:20:15
3 hours, 20 minutes, 15 seconds
created okay cool so that's basically what we mean by it let me explain it to you so there may
3:20:22
3 hours, 20 minutes, 22 seconds
be a particular Network when we talked about IP addresses we talked about IP addresses right there are like there's four parts to it let's say one of the
3:20:29
3 hours, 20 minutes, 29 seconds
parts is like 192.168 2 300
3:20:38
3 hours, 20 minutes, 38 seconds
and3 or something okay something like that so this thing is basically known as
3:20:45
3 hours, 20 minutes, 45 seconds
the network address of your device Network
3:20:52
3 hours, 20 minutes, 52 seconds
address it basically tells which network your device resides in and this is the device
3:21:00
3 hours, 21 minutes
address okay I hope it clear now we'll obviously look more into IP addresses later on ipv4 IPv6 and everything we'll we'll cover
3:21:09
3 hours, 21 minutes, 9 seconds
it okay and this is how routing takes place okay okay now another important
3:21:16
3 hours, 21 minutes, 16 seconds
doubt you may be having Kunal that is fine you have your routing tables in your routers and that's trying to forward things over here and here what
3:21:24
3 hours, 21 minutes, 24 seconds
if someone adds a new router in there you know some some locality or whatever and you want to you would that be included in the routing table also how
3:21:33
3 hours, 21 minutes, 33 seconds
would that be happening and who creates these routing tables who is adding these destination addresses and everything how does my router know where to forward
3:21:41
3 hours, 21 minutes, 41 seconds
data packets or whatever who is creating these tables we know how it's working but who who created these tables where did it come
3:21:49
3 hours, 21 minutes, 49 seconds
from okay so who creates these tables control
Chapter 33: Control Plane
3:22:00
3 hours, 22 minutes
plane in the network layer there's something known as control plane so what happens is that control plane is used to
3:22:08
3 hours, 22 minutes, 8 seconds
you know build these uh these routing tables and uh every router you can think of it as a graph okay so every router is
3:22:18
3 hours, 22 minutes, 18 seconds
a node and the links between the routers are edges of the graph okay routers are what very very big graph you can imagine
3:22:26
3 hours, 22 minutes, 26 seconds
it these are the nodes of the graph if you're not aware of how no what are nodes and graphs and all these algorithms then uh please check out my
3:22:34
3 hours, 22 minutes, 34 seconds
DSA boot camp we'll be covering it over there so routers are nodes and uh the edges the links are the edges the
3:22:43
3 hours, 22 minutes, 43 seconds
links between routers are the edges okay so there are two types of routings
3:22:52
3 hours, 22 minutes, 52 seconds
that you use to create the tables first is the static routing this is basically adding
3:23:00
3 hours, 23 minutes
addresses manually now obviously this is like time consuming and uh if a if a new address
3:23:07
3 hours, 23 minutes, 7 seconds
is added then you would have to change that it's not adaptive really okay so that's basically static routing you
3:23:14
3 hours, 23 minutes, 14 seconds
manually add all these routes okay if you want to go to this network address then you go it via over here here here here here you add it manually in the
3:23:23
3 hours, 23 minutes, 23 seconds
routing table okay cool the second one is dynamic
3:23:32
3 hours, 23 minutes, 32 seconds
routing Dynamic routing this sort of like evolves okay when there's a change in
3:23:39
3 hours, 23 minutes, 39 seconds
network it will evolve accordingly okay the algorithms they use are some what like this you know bman
3:23:47
3 hours, 23 minutes, 47 seconds
Ford dyra path finding algorithms they that those algorithms have been used in finding these paths to various
3:23:54
3 hours, 23 minutes, 54 seconds
algorithms and routers literally D algorithm has been used in this so some people ask what are the uses of these algorithms we're learning in data
3:24:03
3 hours, 24 minutes, 3 seconds
structures the entire internet is built on that all right cool sound good okay now let's talk
3:24:11
3 hours, 24 minutes, 11 seconds
about protocols in application layer we talked about protocols transport layer we talked about two protocols TCP and UDP um there's one more protocol in the
3:24:21
3 hours, 24 minutes, 21 seconds
network layer that takes place which is Internet Protocol or IP so what is the network layer protocol if someone asks you it's the Internet Protocol okay IP
Chapter 34: IP (Internet Protocol)
3:24:30
3 hours, 24 minutes, 30 seconds
so Internet Protocol here we'll learn about IP addresses
3:24:37
3 hours, 24 minutes, 37 seconds
Internet Protocol IP okay now what is the Internet Protocol you know when we talk about the
3:24:44
3 hours, 24 minutes, 44 seconds
TCP IP model that we talked about about the entire five layers that we were talking about in that the IP part is the Internet Protocol so it basically is the
3:24:53
3 hours, 24 minutes, 53 seconds
network the protocol that lies in the networking layer it we here we work with like you know how this uh this thing the the routing stuff that I mentioned
3:25:01
3 hours, 25 minutes, 1 second
happens uh this uh the control plane stuff and the IP addresses mainly okay so these are known as IP hosts okay so
3:25:10
3 hours, 25 minutes, 10 seconds
this is known as an IP address so IP addresses basically let's uh talk a little bit more about that first so when
3:25:18
3 hours, 25 minutes, 18 seconds
we talk about IP addresses what are IP addresses currently we are talking about version fours okay we'll talk about version like uh uh the six version six
3:25:27
3 hours, 25 minutes, 27 seconds
uh later on first let's talk about the ones that we have been using so far so ipv4 IP address version 4 let talk about
3:25:36
3 hours, 25 minutes, 36 seconds
that so these are 32 bit numbers okay with four words
3:25:46
3 hours, 25 minutes, 46 seconds
okay what is an IP address we already know it defines a server a client a node or a router okay uniquely
3:25:53
3 hours, 25 minutes, 53 seconds
defines okay what is IPv6 this is the future okay so basically 32bit may be
3:26:02
3 hours, 26 minutes, 2 seconds
like uh even though 2^ 32 unique numbers that's a lot of numbers right but uh still it may be possible that some
3:26:09
3 hours, 26 minutes, 9 seconds
someday we run out um that's why we have like some more you know features and additional functionalities and IPv6
3:26:15
3 hours, 26 minutes, 15 seconds
address say these are 128 bits okay so we'll talk more about that later
3:26:25
3 hours, 26 minutes, 25 seconds
okay so when we talk about like IP address 5.
3:26:31
3 hours, 26 minutes, 31 seconds
6.9.4 so this is an 8 bit number okay this is another 8bit number 8 bit number
3:26:37
3 hours, 26 minutes, 37 seconds
8 bit number 8 4 are 32 so what is five in binary five in binary is 1
3:26:44
3 hours, 26 minutes, 44 seconds
0 1 0 0 0 0 uh 1 2 3 4 5 6 7 8 8
3:26:54
3 hours, 26 minutes, 54 seconds
Bits okay similarly 8 Bits here 8 Bits here 8 Bits here that calls a you know
3:27:02
3 hours, 27 minutes, 2 seconds
an IP IP address okay cool now let's talk about it like we know that IP addresses are
3:27:10
3 hours, 27 minutes, 10 seconds
like you know used to identify your devices or whatever but when I told you about this hopping Kunal one device will
3:27:17
3 hours, 27 minutes, 17 seconds
go over to another to over to another to another so is it like my router in my house takes part in this
3:27:25
3 hours, 27 minutes, 25 seconds
hopping is it like uh you know I am serving someone else's traffic also is that how it's happening the answer is
3:27:32
3 hours, 27 minutes, 32 seconds
not really so what happens is that instead of hopping on your individual
3:27:40
3 hours, 27 minutes, 40 seconds
routers this routing path you may be confused Kunal this does not seem like doable you know it's like all of our
3:27:47
3 hours, 27 minutes, 47 seconds
devices are connected like you know one other my router is connected to my neighbor's router is that what you're saying in a way you can you know make
3:27:54
3 hours, 27 minutes, 54 seconds
that connection but the routing like this hopping things actually happens over the internet service
3:28:03
3 hours, 28 minutes, 3 seconds
providers okay so the routing table and stuff that I mentioned it does not have like every single information of every
3:28:10
3 hours, 28 minutes, 10 seconds
single person's router in the world that's not like how it works so the basic idea is is that it has blocks of
3:28:18
3 hours, 28 minutes, 18 seconds
addresses not individual addresses blocks of IB addresses okay and these blocks of IP addresses are assigned to
3:28:26
3 hours, 28 minutes, 26 seconds
the internet service providers like airel Reliance tataa or whatever okay this is known as what
3:28:34
3 hours, 28 minutes, 34 seconds
subnetting this is the thing I told you about right over here this is the network address and this this this is
3:28:40
3 hours, 28 minutes, 40 seconds
the device address so so all the devices that are in the same
3:28:48
3 hours, 28 minutes, 48 seconds
network will start from
3:29:16
3 hours, 29 minutes, 16 seconds
whenever a router will forward a packet like this it should know the subnet of the
3:29:25
3 hours, 29 minutes, 25 seconds
destination Okay cool so the internet Society or whatever they created classes for
3:29:32
3 hours, 29 minutes, 32 seconds
this okay they created classes for this so there are three types of like class address you can say IP address of Class
3:29:39
3 hours, 29 minutes, 39 seconds
A is there Class B is there and class C is
3:29:47
3 hours, 29 minutes, 47 seconds
there there's also class D and E D and E are also
3:29:53
3 hours, 29 minutes, 53 seconds
there okay let me just write it down in a nice way class of IP
3:30:00
3 hours, 30 minutes
addresses class is just a basic range class of IP
3:30:07
3 hours, 30 minutes, 7 seconds
addresses so if I'm talking about class A B C D E all the classes starting from
3:30:15
3 hours, 30 minutes, 15 seconds
like zero 0 0 0 till uh 127 dot what is the maximum value
3:30:23
3 hours, 30 minutes, 23 seconds
255.255 255 okay then we have 128.
3:30:28
3 hours, 30 minutes, 28 seconds
0.0.0 then we have 1920. then we have
3:30:34
3 hours, 30 minutes, 34 seconds
2240 point0 and then we have 240. z.0 point0 starting from this
3:30:42
3 hours, 30 minutes, 42 seconds
till 192 -1 191 223 239 and what is the last 255 do 255
3:30:53
3 hours, 30 minutes, 53 seconds
255 255 so on and so forth you get the idea do 255 255 255
3:31:01
3 hours, 31 minutes, 1 second
255 255 255 255 255
3:31:09
3 hours, 31 minutes, 9 seconds
255 okay sound good so this is B basically what we mean so this is the network
3:31:17
3 hours, 31 minutes, 17 seconds
address Network address we already already mentioned right that last last one will represent the you know your host address and this is the network
3:31:26
3 hours, 31 minutes, 26 seconds
address the first three numbers okay sound
3:31:33
3 hours, 31 minutes, 33 seconds
good cool all right okay now comes up comes into picture one more thing called subnet masking okay so what is subnet
3:31:42
3 hours, 31 minutes, 42 seconds
masking subnet masking basically means that uh the subnet mask is going to mask the the
3:31:50
3 hours, 31 minutes, 50 seconds
the network part of the thing that we talked about okay the IP address Network part of the IP address and it will leave
3:31:57
3 hours, 31 minutes, 57 seconds
for us to use the host part okay the device part for example if I have an IP
3:32:03
3 hours, 32 minutes, 3 seconds
address like a network part of a uh of a of this IP address for example Class C
3:32:10
3 hours, 32 minutes, 10 seconds
so Class C IP address basically means that uh um
3:32:17
3 hours, 32 minutes, 17 seconds
if we only want to have this thing so for example a subnet mask for class 3 is
3:32:24
3 hours, 32 minutes, 24 seconds
255.255.0.0 that is basically what it means okay meaning I can add any numbers over here so all the devices that will
3:32:33
3 hours, 32 minutes, 33 seconds
be 255.255 do any numbers over here that means that it belongs to IP address of Class
3:32:40
3 hours, 32 minutes, 40 seconds
C so don't have this confusion why are we using IP addresses classes or whatever because we want to be able to
3:32:48
3 hours, 32 minutes, 48 seconds
tell which particular category it belongs to
3:32:55
3 hours, 32 minutes, 55 seconds
okay sound good okay there are also like variable length Subs available okay but we can look into like uh into into that
3:33:03
3 hours, 33 minutes, 3 seconds
later on all right okay so what do we mean by variable length subnets so variable length subnet basically means
3:33:11
3 hours, 33 minutes, 11 seconds
that uh you can set your own length of the let's say the network
3:33:21
3 hours, 33 minutes, 21 seconds
um subnet Network okay for example here it's saying that you can add items over here and here numbers over here and here
3:33:28
3 hours, 33 minutes, 28 seconds
so if you have a subnet like this 1 2.0.0 Das
3:33:36
3 hours, 33 minutes, 36 seconds
31 so this basically means that first 31 bits are basically my Subnet
3:33:44
3 hours, 33 minutes, 44 seconds
part okay rest remaining remaining okay sound good for example if you have
3:33:52
3 hours, 33 minutes, 52 seconds
something like 1920.
3:33:58
3 hours, 33 minutes, 58 seconds
1.024 so to Total we have 32 bits uh 24 are
3:34:05
3 hours, 34 minutes, 5 seconds
already occupied by the subnet remaining eight okay so starting will be what
3:34:13
3 hours, 34 minutes, 13 seconds
starting of the IP address that you can have over here is the first eight would be the same first first 24 bits would not change because these are the subnet
3:34:22
3 hours, 34 minutes, 22 seconds
0.1.0 ending will be and then you can have 0 9 1920. 1.1 1920. 1.2 so ending
3:34:31
3 hours, 34 minutes, 31 seconds
can be 19201 255 total how many do you have
3:34:37
3 hours, 34 minutes, 37 seconds
256 so if there's a subnet of uh size 24 bits then remaining bits are eight so
3:34:44
3 hours, 34 minutes, 44 seconds
you can have total 256 to H part8 okay that's basically
3:34:52
3 hours, 34 minutes, 52 seconds
what a subnet is and this is how it's allocated to IP addresses but now the question is how do we allocate it to IP
3:34:58
3 hours, 34 minutes, 58 seconds
addresses like who allocates it okay how do we allocate which particular IP sorry uh not IP addresses um internet service
3:35:06
3 hours, 35 minutes, 6 seconds
providers isps okay so initially what was happening was that it was on first come first sub basis okay so larger B
3:35:15
3 hours, 35 minutes, 15 seconds
bigger bigger organizations like there was uh MIT and Stanford and stuff and you know IBM was really po really popular in terms of like the internet
3:35:23
3 hours, 35 minutes, 23 seconds
age so they all got the class one IP address block okay this
3:35:30
3 hours, 35 minutes, 30 seconds
one this one okay so it was on like first come
3:35:38
3 hours, 35 minutes, 38 seconds
first Ser basis but then what did they try to do they say like okay we are not going to worry about these classes and structure
3:35:46
3 hours, 35 minutes, 46 seconds
we are just going to focus on uh this thing the you know
3:35:53
3 hours, 35 minutes, 53 seconds
um like we are not going to worry about like the variable length uh subnet masking we can work on that okay so the
3:36:01
3 hours, 36 minutes, 1 second
internet Society uh the IET if uh they are the ones um the internet engineering
3:36:08
3 hours, 36 minutes, 8 seconds
task force okay um so they are the ones who assign these IP addresses to your isps and stuff okay so they don't worry
3:36:16
3 hours, 36 minutes, 16 seconds
about the classes or whatever they are just like we are going to assign the IP addresses based on regions why because they want to minimize the number of
3:36:23
3 hours, 36 minutes, 23 seconds
let's say hops when you're finding your IP addresses and stuff okay so that's one of the reasons why they don't work with like you know they don't assign it
3:36:30
3 hours, 36 minutes, 30 seconds
based on classes they assign it based on regions all right okay some of these ipv4 addresses that we're talking about
3:36:38
3 hours, 36 minutes, 38 seconds
are reserved they are like special addresses for example uh the first bit is reserved to let's say uh special one
3:36:46
3 hours, 36 minutes, 46 seconds
or reserved ones let's talk about this reserved addresses okay so first one is 127
3:36:56
3 hours, 36 minutes, 56 seconds
0.0.0.0 8 means first eight bits are reserved these can be anything so an example can be Local
3:37:04
3 hours, 37 minutes, 4 seconds
Host Local Host is what 127.0.0.1 so these are known as loop back
3:37:12
3 hours, 37 minutes, 12 seconds
addresses loop back addresses why is it known as loop back because the processes that are going to
3:37:20
3 hours, 37 minutes, 20 seconds
be running on your machine you know using your the TCP IP protocols it will allow you to contact the same processes
3:37:27
3 hours, 37 minutes, 27 seconds
so your device will act as client also and server also you know Local Host these are those for testing purposes if you are a developer you definitely know
3:37:35
3 hours, 37 minutes, 35 seconds
what Local Host is but now you know the story behind it okay so it's it's it cannot be down it will always be up if the computer is running then you will
3:37:43
3 hours, 37 minutes, 43 seconds
have your Local Host up and and um you you can have like as many of loop back addresses if you as you
3:37:51
3 hours, 37 minutes, 51 seconds
want okay sound good all right okay so now let's look at how these things the the the packets thing we talked about
3:37:59
3 hours, 37 minutes, 59 seconds
right the uh data travels in packets and uh let's see how it travels and what is consisting inside a packet so one thing I'd like you to you know if you want to
3:38:08
3 hours, 38 minutes, 8 seconds
learn more about how it works internally then obviously learn watch you know check the research papers of how the internet packets uh you know I address
3:38:15
3 hours, 38 minutes, 15 seconds
packet the IP IP version for packets work so we have already seen two packets um one was for TCP and one was for UDP
3:38:25
3 hours, 38 minutes, 25 seconds
now the those are segments and uh the transport layer chunks are called Data chunks are called segments there was segments I believe uh this one is called
3:38:34
3 hours, 38 minutes, 34 seconds
packets in network layer the IP version four data packets they known as packets okay
3:38:42
3 hours, 38 minutes, 42 seconds
so packets so apart from the data the header is of 20 bytes okay so
Chapter 35: Packets
3:38:50
3 hours, 38 minutes, 50 seconds
packets header is of 20 bytes of
3:38:55
3 hours, 38 minutes, 55 seconds
20 bytes okay it contains the IP version and the you know the total length for
3:39:02
3 hours, 39 minutes, 2 seconds
example so like IP version the total length it contains it contains an ident
3:39:09
3 hours, 39 minutes, 9 seconds
uh identification number for example uh in the previous example we saw some Flags this also contains some Flags if
3:39:17
3 hours, 39 minutes, 17 seconds
you're working with tcpip right and uh so many other things like protocols you can Google it about yourself okay check
3:39:25
3 hours, 39 minutes, 25 seconds
[Music]
3:39:26
3 hours, 39 minutes, 26 seconds
some and addresses etc etc there's one more thing
3:39:33
3 hours, 39 minutes, 33 seconds
that contains which I'll talk about is TTL time to live Etc
3:39:42
3 hours, 39 minutes, 42 seconds
so what is time to live basically you know that your packets are traveling on various IP addresses like various
3:39:50
3 hours, 39 minutes, 50 seconds
routers it's it's hopping hopping hopping it may be possible that sometimes a packet may be like uh you know in a loop or something and may not
3:39:57
3 hours, 39 minutes, 57 seconds
reach after so many hops so that is what time to live means let's see in a in a in some detail let's see that so if I go
3:40:04
3 hours, 40 minutes, 4 seconds
to my terminal and I say ping google.com Okay so this is what time to live is
3:40:12
3 hours, 40 minutes, 12 seconds
TTL okay so means after like 60 hops if it is not reached then the packet will be dropped zero packet loss right now but
3:40:21
3 hours, 40 minutes, 21 seconds
uh in case it was not then it was drop and this is a sequence number sequence number I mentioned to you right the packet is coming in sequence it has a
3:40:28
3 hours, 40 minutes, 28 seconds
sequence number or whatever this is that this is that thing okay let's move forward so that's what basically time to live is so so
3:40:36
3 hours, 40 minutes, 36 seconds
that pet is not roaming inside the network forever if after some particular hops it's not leaving it's not reaching
3:40:43
3 hours, 40 minutes, 43 seconds
the destination then it will be dropped okay okay so this is a little bit more about packets you can you can Google about
3:40:50
3 hours, 40 minutes, 50 seconds
it okay and how these packets like travel and everything we have covered that already you know like IP like routers they do hopping and obviously
3:40:58
3 hours, 40 minutes, 58 seconds
now you know about time to live so whenever you are doing a Hopping it will decrease the value of time to live and it has the check sum values and uh
3:41:06
3 hours, 41 minutes, 6 seconds
things like that okay so that's basically about it if you want to learn more about it you can learn about and watch the research papers and uh dive deep into it like how these packets work
3:41:14
3 hours, 41 minutes, 14 seconds
like even at a minute level uh but I think this is more than enough to understand like how the internet works okay two things one thing I already
3:41:23
3 hours, 41 minutes, 23 seconds
mentioned to you was about uh this is the thing that I already mentioned which was DHCP okay so now we're talking about
3:41:31
3 hours, 41 minutes, 31 seconds
like let's talk about like the data link layer okay so let's talk about data link layer okay okay now that we have learned
3:41:40
3 hours, 41 minutes, 40 seconds
about IP version 4 let's talk a little bit more about IP version 6 IP IP V6 okay IP
Chapter 36: IPV4 vs IPV6
3:41:49
3 hours, 41 minutes, 49 seconds
V6 so ipv4 means it's 2^ 32 okay so two 32 bits IP V4 is 32 bits so in ipv ipv4
3:41:59
3 hours, 41 minutes, 59 seconds
is 32 bits means 2^ 32 unique IP addresses you can create which is almost something like 4.3 billion IP addresses
3:42:08
3 hours, 42 minutes, 8 seconds
unique okay so initially people thought this was enough okay but now as more and more people are using the internet and
3:42:15
3 hours, 42 minutes, 15 seconds
smartphones and things like that we may run out okay so this is a new internet new version of IP addresses called
3:42:25
3 hours, 42 minutes, 25 seconds
IPv6 okay IPv6 it is actually four times larger than
3:42:34
3 hours, 42 minutes, 34 seconds
ipv4 okay four times larger so how many unique addresses can be form in IP V6 2
3:42:41
3 hours, 42 minutes, 41 seconds
to power 3 into 4 sorry 32 into four which is equal to a lot of numbers like
3:42:51
3 hours, 42 minutes, 51 seconds
uh that's a lot it is a lot of number I can't even write it down so 2 ra to power some
3:43:00
3 hours, 43 minutes
128 just Google it okay so this is 3.4 into 10 to power
3:43:09
3 hours, 43 minutes, 9 seconds
38 numbers that's a lot of numbers these many unique IP addresses you can form
3:43:16
3 hours, 43 minutes, 16 seconds
okay cool but there are some cons Associated to it some of the like pros and cons stuff cons that are associated
3:43:24
3 hours, 43 minutes, 24 seconds
with this is it is not Backward Compatible because it's a new technology okay
3:43:32
3 hours, 43 minutes, 32 seconds
not I mean people are using it some folks are using it and stuff but that the devices that are
3:43:39
3 hours, 43 minutes, 39 seconds
already covered configured like over your IP version 4 cannot access like websites or servers that may be
3:43:47
3 hours, 43 minutes, 47 seconds
configured with ipv 6 okay also a lot of you know like it's
3:43:56
3 hours, 43 minutes, 56 seconds
going to require some efforts okay this is the reason why the entire world has not shifted on IPv6
3:44:02
3 hours, 44 minutes, 2 seconds
yet okay cool because isps would have to shift would have to shift
3:44:17
3 hours, 44 minutes, 17 seconds
lot of Hardware work work
3:44:24
3 hours, 44 minutes, 24 seconds
okay sound good cool so let's talk about it um how is it
3:44:34
3 hours, 44 minutes, 34 seconds
represented so there are actually eight eight numbers and every single number is a hexadecimal
3:44:42
3 hours, 44 minutes, 42 seconds
digit okay represents like 16bit parts of the addresses okay
3:44:51
3 hours, 44 minutes, 51 seconds
hexadecimal okay sound good so here we
3:44:55
3 hours, 44 minutes, 55 seconds
have like something like a a a a a a a a
3:45:04
3 hours, 45 minutes, 4 seconds
1 2 3 4 5 6 7 8 and this is a hexade decimal
3:45:13
3 hours, 45 minutes, 13 seconds
okay sound good so this is 128 bits so if I'm talking
3:45:19
3 hours, 45 minutes, 19 seconds
about you know like 32 into 4 128 and
3:45:25
3 hours, 45 minutes, 25 seconds
128 I'm saying dividing into 8 so what do we get over here 16 so it's a 16bit
3:45:33
3 hours, 45 minutes, 33 seconds
number hexadecimal this is a 16bit string over here of hexadecimal
3:45:41
3 hours, 45 minutes, 41 seconds
okay sound good all
3:45:49
3 hours, 45 minutes, 49 seconds
right that's basically about it okay so we won't be diving deep into
3:45:56
3 hours, 45 minutes, 56 seconds
IPv6 but uh an example if you want to take an example and heade decimal I can take something
3:46:04
3 hours, 46 minutes, 4 seconds
like something like a b f e something like that okay
3:46:13
3 hours, 46 minutes, 13 seconds
f001 3 2 1 0 9 1 8 2 something like that
3:46:24
3 hours, 46 minutes, 24 seconds
obviously 0 0 1 2 3 4 5 6 1 three something like that I ran out of paper
3:46:33
3 hours, 46 minutes, 33 seconds
but you get the idea it's one of the examples so you see this is a little lot big
3:46:40
3 hours, 46 minutes, 40 seconds
number okay sound good
3:46:49
3 hours, 46 minutes, 49 seconds
cool and you know in previous IP addresses we had something like like 127 0.0.0 -8 8 basically means you know the
3:46:58
3 hours, 46 minutes, 58 seconds
subnet that is prefixed prefix so in this also we can do the same we can do the same representation
3:47:07
3 hours, 47 minutes, 7 seconds
here also okay exactly the same like that some can be fixed let's say say first
3:47:16
3 hours, 47 minutes, 16 seconds
two are or let's say you know we have the first uh first four are fixed for
3:47:22
3 hours, 47 minutes, 22 seconds
example okay so you can have like a b Fe e f o
3:47:28
3 hours, 47 minutes, 28 seconds
001 32 and 9182 okay after this I can just
3:47:37
3 hours, 47 minutes, 37 seconds
say rest are fixed so let's say 60 sorry first 60 are fixed and then rest as it is
3:47:46
3 hours, 47 minutes, 46 seconds
okay no it will be three no it will four that's fine yeah about four something like
3:47:53
3 hours, 47 minutes, 53 seconds
that sound good make it smaller like I think that's sounds good okay so if all the values are zero so for example if
3:48:01
3 hours, 48 minutes, 1 second
all the values are zero you can just represent it as zero or if you put just one zero over here or
3:48:08
3 hours, 48 minutes, 8 seconds
you put no zeros over here that is also fine so basically if you're just having like dot dot so basically 0 0 0 0 0 0 0
3:48:16
3 hours, 48 minutes, 16 seconds
0 0 0 0 0 0 something like this uh basically is equal to 0 0 0 if I have
3:48:24
3 hours, 48 minutes, 24 seconds
one over here and 9 over here something like this 1 9 okay you can also write this
3:48:32
3 hours, 48 minutes, 32 seconds
as like this somehow means this between is full of zeros okay how many zeros that depends
3:48:41
3 hours, 48 minutes, 41 seconds
on like how many numbers you may have in front or back okay
3:48:49
3 hours, 48 minutes, 49 seconds
cool let's move forward okay so you can learn more about it and how uh you know companies are utilizing ipv4 IPv6 and
3:48:58
3 hours, 48 minutes, 58 seconds
how the government is you know transporting it like deciding whom to give and what all are in use right now you can research more about it later on
3:49:05
3 hours, 49 minutes, 5 seconds
but we are not going to worry about that because we are working with ipv4 and during the course also we'll working with ipv4 okay one more thing I want to
3:49:13
3 hours, 49 minutes, 13 seconds
mention is that right now we have learned about the computers that interact with each other and the routers but there's one more thing that interact
3:49:20
3 hours, 49 minutes, 20 seconds
with the network packets that come from the network layer these are known as middle
3:49:29
3 hours, 49 minutes, 29 seconds
boxes okay so these are like uh extra devices that also interact with the IP
3:49:37
3 hours, 49 minutes, 37 seconds
packets okay so mostly you will find these like you know let's say in the network layer but they can also be in the transport layer first one such first
3:49:45
3 hours, 49 minutes, 45 seconds
such device is firewall may have heard about firewall okay so let's see what a firewall is okay so so far we have learned about like two types of devices
Chapter 37: Middle Boxes
3:49:54
3 hours, 49 minutes, 54 seconds
one is like the end systems or computers and another one another one is what the routers but there's one more type of device that comes in between which are
3:50:03
3 hours, 50 minutes, 3 seconds
known as middle boxes so middle boxes are like uh you know um they they also uh work with like you know your packets
3:50:11
3 hours, 50 minutes, 11 seconds
that are being coming so you can allow some packets and reject some packets and modify these packets so on and so forth
3:50:18
3 hours, 50 minutes, 18 seconds
all right so some of these they operate over like in the network layer but they also exist in the transport layer so one of these middle box that we look into is
3:50:27
3 hours, 50 minutes, 27 seconds
a fireball so middle box is AR there just like a middle like devices apart from your computer and uh the routers
3:50:35
3 hours, 50 minutes, 35 seconds
that also work with packets so for example using a fireball there are like two types of fireballs right so there's one that is connected to like the global
3:50:43
3 hours, 50 minutes, 43 seconds
internet and one that is connected to your own network right so what firewall does is it provides like filters so you
3:50:50
3 hours, 50 minutes, 50 seconds
are uh you are get given like some filters like okay all the IP packets that that are coming to my network uh they can be filtered out based on let's
3:50:58
3 hours, 50 minutes, 58 seconds
say the address okay so if you have someone who who IP address is coming from a specific address you want to
3:51:05
3 hours, 51 minutes, 5 seconds
block that spe so you can block that uh you can modify the packet for example some IP address coming it's coming it's going to location destination a you want
3:51:14
3 hours, 51 minutes, 14 seconds
to change it to destination B you can change its header or something like that you can uh you know set some rules on
3:51:21
3 hours, 51 minutes, 21 seconds
like the port numbers like okay on this port numbers we're not allowed to have uh you can set Flags so for example in the new connection we saw that a sin
3:51:29
3 hours, 51 minutes, 29 seconds
flag is required right um so you can be like okay block all the sin flag so that no one can make a new connection and like similarly like port numbers and
3:51:38
3 hours, 51 minutes, 38 seconds
protocols so on and so forth right so there are like two types of firewalls there's a stateless firewall and there's
3:51:45
3 hours, 51 minutes, 45 seconds
a stateful uh firewall so the stateless firewall will obviously do not maintain a state um and a stateful firewall will
3:51:53
3 hours, 51 minutes, 53 seconds
uh you know see the packet and maintain its state means it store it stores it in its cash memory so all the other that
3:52:00
3 hours, 52 minutes
will come uh you know for it it will basically be like okay we have received some sort of a similar packet we can allow this one or deny this one or
3:52:08
3 hours, 52 minutes, 8 seconds
whatever so since it's using cash memory and something like that it's a little bit more efficient so where is this in the network it's basically uh in the um
3:52:17
3 hours, 52 minutes, 17 seconds
you know um there's like two types of it so one is like the the one that is hosted uh
3:52:24
3 hours, 52 minutes, 24 seconds
you know by the host and end systems and one that is in the network so it's in the network layer as well and uh it's in
3:52:31
3 hours, 52 minutes, 31 seconds
the transport layer as well okay so the second middle box that we're looking at is called a network address translator
Chapter 38: (NAT) Network Address Translation
3:52:40
3 hours, 52 minutes, 40 seconds
okay Network address translation which is known as natat so what is natat so basically natat is a method of mapping an IP address space into another by
3:52:48
3 hours, 52 minutes, 48 seconds
modifying the network address IP information in the header of the packet okay so the idea is something like this
3:52:56
3 hours, 52 minutes, 56 seconds
that you have your own IP addresses over here right and you have a Nat over here Network address translation so it will
3:53:03
3 hours, 53 minutes, 3 seconds
modify the addresses so to the outside world the address of the devices will look like 150150 0.1 that is connected
3:53:11
3 hours, 53 minutes, 11 seconds
to the internet okay now since the IDs are coming from this network initially the host ID was 10.0.0.0 but Nat
3:53:20
3 hours, 53 minutes, 20 seconds
actually modified it for the internet now the ID is coming from 150. 150. 0.1 so now all the IDS in your network can
3:53:28
3 hours, 53 minutes, 28 seconds
be worked as a private IP this is the basically what Nat is okay sound good so why did this
3:53:37
3 hours, 53 minutes, 37 seconds
happen so basically uh you know um to slow down the consumption of IP addresses we can only have like 2 H 30
3:53:44
3 hours, 53 minutes, 44 seconds
to so that's basically one of the reasons okay so some Enterprise uh you know networks also use this and you can
3:53:51
3 hours, 53 minutes, 51 seconds
learn more about how you can send a message over a net okay so that's basically about it all right so whenever you're getting some packets or something
3:54:00
3 hours, 54 minutes
like this Nat will have like U like its own like you know uh memory or something where it's going to save it and then it's going to pass it over over the
3:54:09
3 hours, 54 minutes, 9 seconds
internet you can learn more about it like there's a lot of types of uh nads as you can see uh you know like applications for
3:54:16
3 hours, 54 minutes, 16 seconds
example so it's used in routing in load balancing right um and uh also some issues and limitations you can also
3:54:24
3 hours, 54 minutes, 24 seconds
learn about like how it works the implementation so like a two-way communication and IP header contains the IP source and destination IP address
3:54:32
3 hours, 54 minutes, 32 seconds
this is something we already know and uh you know so many things like you can do so you can have private IP addresses and
3:54:39
3 hours, 54 minutes, 39 seconds
everything like that okay and translation process and visible of visibility operation everything you can types of knats you can see on this
3:54:47
3 hours, 54 minutes, 47 seconds
screen right over here and methods of translation and all these other things so it's a pretty big topic and definitely you know out of out of our
3:54:55
3 hours, 54 minutes, 55 seconds
scope but uh a good information like how it works and everything was important to important to give so same thing like U
3:55:03
3 hours, 55 minutes, 3 seconds
you know the the source address of the packet that you'll be having uh that that is replaced by the public address
3:55:10
3 hours, 55 minutes, 10 seconds
right and then the Chuck sum is also updated and then it's sort of like carried out via TCP or UDP okay and when
3:55:18
3 hours, 55 minutes, 18 seconds
you receive a packet uh then uh you know you get it from the public internet and the the natat will be like okay where do
3:55:25
3 hours, 55 minutes, 25 seconds
I have it in my table we have gotten it from the public internet and then it is forwarded in your own internal Network so that's about Nat and that's another
3:55:33
3 hours, 55 minutes, 33 seconds
type of middle box so this was about like the network layer and now the second last layer so let's talk
Chapter 39: TCP (Data Link Layer)
3:55:41
3 hours, 55 minutes, 41 seconds
about data link layer of TCP okay so let's talk about data link layer
3:55:50
3 hours, 55 minutes, 50 seconds
and what it does so the data packets that we received from the network layer the data link layer is responsible to
3:55:57
3 hours, 55 minutes, 57 seconds
send these packets over a over a physical link
3:56:04
3 hours, 56 minutes, 4 seconds
okay sound good cool so it will just transport like your data
3:56:12
3 hours, 56 minutes, 12 seconds
between like connect devices for example for example you have your own router I mentioned this previously you have your
3:56:22
3 hours, 56 minutes, 22 seconds
router okay your router has some IP address that is provided by your ISP some devices are connected to that
3:56:30
3 hours, 56 minutes, 30 seconds
router these devices have their own IP addresses so there's going to be a
3:56:37
3 hours, 56 minutes, 37 seconds
subnet available over here and new IP addresses are going to be allocated to this how does this happen I've mentioned
3:56:45
3 hours, 56 minutes, 45 seconds
this previously DHCP okay it's known as Dynamic host configuration
3:56:52
3 hours, 56 minutes, 52 seconds
protocol okay so dynamic or you can Google it yourself Dynamic host configuration protocol so whenever a new devic is added to your
3:57:00
3 hours, 57 minutes
router or whatever it will connect your new device basically your new
3:57:07
3 hours, 57 minutes, 7 seconds
device is going to connect to the DHCP server okay he's going to be like hey I need
3:57:17
3 hours, 57 minutes, 17 seconds
some uh IP address can you please uh allocate me some of the some of the IP addresses okay and every uh DHCP server
3:57:26
3 hours, 57 minutes, 26 seconds
will have some pool of IP addresses pool of IP
3:57:34
3 hours, 57 minutes, 34 seconds
addresses a b c d IP addresses so it's going to assign some IP address to your new
3:57:42
3 hours, 57 minutes, 42 seconds
device okay okay so since we're talking about the data link layer we are now not like talking about Network like in the networking how it was done now we're
3:57:50
3 hours, 57 minutes, 50 seconds
talking about the actual physical presence like how data will be transferred to like the devices that are connected together for example various
3:57:57
3 hours, 57 minutes, 57 seconds
lands okay so one more thing happens is that um there may be many um you know devices connected in
3:58:07
3 hours, 58 minutes, 7 seconds
your land okay many devices connected together okay many
3:58:17
3 hours, 58 minutes, 17 seconds
devices connected let's say in a local area network for example okay okay so even though two computers are being found out together
3:58:26
3 hours, 58 minutes, 26 seconds
or whatever using the IP addresses and subnets of the IP uh internet service providers or whatever but at the data link layer they communicate with each
3:58:35
3 hours, 58 minutes, 35 seconds
other using the data link layer address okay something known as the data link
3:58:43
3 hours, 58 minutes, 43 seconds
link layer address so every device that will have like you know an IP address they will also have the data link layer
3:58:50
3 hours, 58 minutes, 50 seconds
address so all the you know if you're sending from one place to another they may know their own data link address like of the destination also so
3:58:59
3 hours, 58 minutes, 59 seconds
basically what happens is how it uh you know happens you can manually allocate data link address data link layer address to devices but it also happens
3:59:08
3 hours, 59 minutes, 8 seconds
sometimes like automatically okay for example devices are connected to one Lan let's say device number one 2 3 and 4 so
3:59:17
3 hours, 59 minutes, 17 seconds
device number one 2 3 and four let's say device number one needs to send something to device number four okay so
3:59:25
3 hours, 59 minutes, 25 seconds
device number one will check in its own cache hey do I have the um you know the data link layer of device number four
3:59:34
3 hours, 59 minutes, 34 seconds
it's going to be like no you don't when it does not have it then it's going to uh ask in the in the all the like the
3:59:43
3 hours, 59 minutes, 43 seconds
devices that are connected over here okay this is known as arp cach arp
3:59:52
3 hours, 59 minutes, 52 seconds
cache okay this is known as ARP cache so all the devices I repeat all the devices that will be connected in this will
4:00:00
4 hours
receive a message from this device what will be the message message will be a packet okay or a frame since we are in
4:00:08
4 hours, 8 seconds
data link layer so data link layer transfers in frames Let's see we we wrote it down over here some
4:00:14
4 hours, 14 seconds
here data link layer frames okay so what does a frame contain another good question frame basically contains what
4:00:23
4 hours, 23 seconds
the data link layer of from where the data is coming of the sender so data link uh layer address of
4:00:33
4 hours, 33 seconds
sender and IP address of destination now it's going to be like
4:00:40
4 hours, 40 seconds
hey is the IP add of the destination can you pleas send me the data link layer of the destination it's going to be like yeah sure how about that that's it and that's how it sort of like updates it so
4:00:49
4 hours, 49 seconds
similarly when it gets new data it updates it cash and this is known as address resolution
4:00:59
4 hours, 59 seconds
protocol okay this is what is known as address resolution protocol cool all right okay and it is
4:01:09
4 hours, 1 minute, 9 seconds
these data link layer addresses that we are talking about the data link layer when we we're talking about the data link layer
4:01:16
4 hours, 1 minute, 16 seconds
addresses okay the data link layer addresses this thing is known as Mac address of your devices when you're talking about
4:01:25
4 hours, 1 minute, 25 seconds
ethernet and stuff this is also known as your Mac addresses it identifies the device so Mac address is not of your
4:01:33
4 hours, 1 minute, 33 seconds
device it's actually of the component so your Wi-Fi may have a different Mac address okay uh your Bluetooth may have
4:01:41
4 hours, 1 minute, 41 seconds
a different Mac address right so this is basically about Mac addresses so it sends all the Mac addresses like okay
4:01:48
4 hours, 1 minute, 48 seconds
which one do I want to go to it will go to that one so as you can see data link layer works very closely with the physical
4:01:56
4 hours, 1 minute, 56 seconds
layer okay it takes a lot of you know like if you if you talk about physical layer how that works that will take a lot of time because that in that then
4:02:04
4 hours, 2 minutes, 4 seconds
we'll talk about Electronics okay and hardware and stuff this is more about the computer networking part that we're talking about
4:02:12
4 hours, 2 minutes, 12 seconds
okay so if you're into electrical and Hardware stuff then definitely research more about it okay so Mac address like when you make a request and when the
4:02:20
4 hours, 2 minutes, 20 seconds
data comes back to your router the it the router it will basically attach the correct private IP address to the data
4:02:29
4 hours, 2 minutes, 29 seconds
packets ensuring that they got to the computer in device the router will do this because all those private IP
4:02:36
4 hours, 2 minutes, 36 seconds
address that I talked about they actually correspond to the correct Mac address only okay so this thing that I talked about the data link layer address
4:02:44
4 hours, 2 minutes, 44 seconds
those are the Mac addresses okay so the router will assign like IP addresses and Mac addresses to it and that way we'll make sure like it reaches the correct
4:02:52
4 hours, 2 minutes, 52 seconds
particular device okay so since like the public and the private IP address will you know remain the same but the MAC address will keep on changing as data
4:03:00
4 hours, 3 minutes
will travel from one device to another so Mac address is like a 12-digit alpha numeric string it's called as media
4:03:06
4 hours, 3 minutes, 6 seconds
Access Control okay and uh it it's a unique identity for a particular network interface it's used by all E Network
4:03:15
4 hours, 3 minutes, 15 seconds
Technologies like ethernet Wi-Fi Bluetooth and so on and so forth Okay cool so you can also block some of the devices like okay this Mac address
4:03:23
4 hours, 3 minutes, 23 seconds
device is blocked or this device is you know allowed or whatever you can do that using Mac addresses as well I hope you are now able to understand how data
4:03:31
4 hours, 3 minutes, 31 seconds
travels from like the network layer to the data link layer and the data link layer is the one that works with Mac addresses okay it works at your router
4:03:39
4 hours, 3 minutes, 39 seconds
level and with the physical devices okay so it converts these into like zeros and ones of bits and transfers it into your
4:03:47
4 hours, 3 minutes, 47 seconds
physical devices using all the protocols everything we just mentioned okay address resolution protocol and everything so we talked about protocols
4:03:54
4 hours, 3 minutes, 54 seconds
in like uh all the layers we have talked about all the protocols in every layer and where every layer Works everything is covered remember like the command we
4:04:03
4 hours, 4 minutes, 3 seconds
did if config you can use that command to check your Mac address also okay so that's basically about it and uh yeah
4:04:11
4 hours, 4 minutes, 11 seconds
that's the data link layer and that's address resolution protocol protol and then comes like the physical layer so actually data gets converted into electrical signals and then get sent to
4:04:19
4 hours, 4 minutes, 19 seconds
your devices or whatever okay so I was in short about how you know not in short we covered a lot of things how the the
4:04:28
4 hours, 4 minutes, 28 seconds
internet works uh if you want more if you look look at more at like the uh data link layer part you can check out
4:04:34
4 hours, 4 minutes, 34 seconds
how it does like the uh for example uh uh there's this thing called like framing okay the framing uh like working
4:04:42
4 hours, 4 minutes, 42 seconds
with the frames how those get converted and everything it also does error detection okay just mentioning some few things you can
4:04:50
4 hours, 4 minutes, 50 seconds
check in in brief like uh that was it and that's how the you know internet works and uh I'm super excited and if
4:04:58
4 hours, 4 minutes, 58 seconds
you just a few things we are doing complete devops boot camp so uh like in depth I taught you all these things I'll teach you that as well so first of all
4:05:06
4 hours, 5 minutes, 6 seconds
make sure you like share subscribe right now and comment right now and you can take a photo of this and and uh then you
4:05:14
4 hours, 5 minutes, 14 seconds
can like maybe yeah you can take a photo and then you can uh like um you
4:05:24
4 hours, 5 minutes, 24 seconds
know add it on socials you can use the hash devops with Kunal the Twitter bot will retweet so it's a our learning in
4:05:32
4 hours, 5 minutes, 32 seconds
public initia that initiative that we always support and I believe that was about it now the next thing will be more Hands-On approach are required so you
4:05:41
4 hours, 5 minutes, 41 seconds
can check out various uh other how to you know get into more into networking and things like that you can take networking certifications and all these
4:05:48
4 hours, 5 minutes, 48 seconds
other things so yeah that's something you can do but I believe for then how the internet works this was a good understanding we covered everything about OSI model about uh every single
4:05:57
4 hours, 5 minutes, 57 seconds
layer and tcpip how the internet works what our IP addresses and good visualization as well this is more than enough to get started with the boot camp
4:06:06
4 hours, 6 minutes, 6 seconds
because in the boot camp we'll be doing Hands-On stuff so when we do Docker we'll do Docker networking when we do kubernetes we'll do kubernetes networking so networking will come again
4:06:14
4 hours, 6 minutes, 14 seconds
and again and again and again and again all right and now just research and Google and have fun and try to you know
4:06:22
4 hours, 6 minutes, 22 seconds
paint the picture in your mind how it works but again very important share on socials like share subscribe and comment
4:06:28
4 hours, 6 minutes, 28 seconds
down below and please share I it's it's a hours and hours long video it made a lot of took a lot of efforts so if you share it's only more motivation for me
4:06:37
4 hours, 6 minutes, 37 seconds
to create more amazing content share with your friends sharees on socials share what you learned write a blog on it if you want and I'll see you in the
4:06:44
4 hours, 6 minutes, 44 seconds
next one please do subscribe and like as well and comment and have a great day
4:06:52
4 hours, 6 minutes, 52 seconds
[Music]