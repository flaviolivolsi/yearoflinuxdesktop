<aside class="preface">
A note before we start. This is not an ambush. If you love your Mac and it loves you back, keep it: a tool that works is a beautiful thing, and nobody's life was ever improved by being lectured about kernels. If switching is not a priority this year, or ever, that is fine too. I wrote this because a few things have genuinely changed, and I think they are worth knowing even if you never act on them. And because if the day comes when your computer annoys you one time too many, I want you to already know where the door is.
</aside>

I started using Linux when I was 11.

The first distribution I tried was [Knoppix](https://www.knopper.net/knoppix/index-en.html), mostly because the idea sounded like magic: an entire operating system running directly from a CD-ROM, loaded into RAM, without even touching the hard drive.

You inserted the disc, started the computer, and suddenly you were somewhere else.

Compared to the grey boredom of Windows 2000, it felt like discovering a secret passage inside my own PC. Then Ubuntu arrived, and an entire era of my life began.

I loved Linux immediately because it treated the computer as something that belonged to me.

Not metaphorically. Actually mine.

I could change it, break it, inspect it, rebuild it, replace any part of it and make it behave however I wanted. It did not constantly try to protect me from myself. It did not assume that the company that made the operating system understood my preferences better than I did. As PewDiePie [properly put it](https://www.xda-developers.com/pewdiepie-install-linux-tortured-by-windows/), Linux hands you a gun and tells you "shoot. It's fine. You're a god now."

It gave me complete freedom.

That freedom came at a cost.

Especially back then, and especially on the wrong hardware, using Linux meant accepting that things would occasionally break for stupid reasons. Wi-Fi might not work. Suspending the laptop might be a gamble. Some piece of software would be missing, half-supported or noticeably worse than its Windows and macOS equivalent.

You needed patience. You needed time. Sometimes you needed to spend an evening learning far more about audio drivers than any human being should ever have to know.

When I was younger, I was mostly fine with that. I had the time, and solving those problems was part of the fun. Over the years, Linux also improved dramatically, so the problems became less frequent and less absurd.

But they never disappeared completely, and I understand why many people were unwilling to tolerate them.

At some point in my twenties, I bought a MacBook to use alongside my main Linux desktop.

There were many things to like about it. It would be dishonest to pretend otherwise. The hardware was polished, the battery lasted, the trackpad was excellent, and the whole machine felt coherent in a way that most laptops did not.

Still, I eventually returned to Linux and bought a Dell XPS 13.

For a while, that was great too. Then my requirements grew, the hardware started showing its limits, and Apple released the M-series MacBooks.

At the time, they were ridiculous.

The performance, battery life and efficiency were so far ahead of almost everything else that buying one felt obvious. I got a MacBook Pro, used it for years and genuinely loved the machine.

But eventually I could no longer tolerate macOS.

<figure class="meme">
  <img src="/dont-want-to-play.jpg" alt="Toy Story meme: Andy dropping Woody, captioned 'I don't want to play with you anymore'" loading="lazy" width="960" height="650" />
  <figcaption>me, with every computer, every couple of years</figcaption>
</figure>

The problem was not one catastrophic flaw. It was death by a thousand papercuts.

macOS constantly feels like an operating system that is trying to stop you from using your computer incorrectly, where “incorrectly” means differently from how Apple imagined it.

It treats you like a child.

You can customize the parts Apple has decided are safe to customize. You can work the way you want, as long as the way you want is sufficiently close to the Apple-approved way. Anything outside that narrow corridor becomes awkward, impossible or dependent on some third-party utility desperately patching over a decision Apple made for you.

Even basic interactions can feel strangely cumbersome.

Swipe between workspaces and macOS forces you to sit through a long, decorative animation during which the interface is effectively non-interactive. It is only about a second, but when you perform that gesture hundreds of times, the delay stops feeling elegant and starts feeling insulting.

Why am I waiting for my own computer?

Why is an animation more important than responsiveness?

Why can I not simply disable it?

This is what macOS became for me: countless tiny moments in which the operating system reminded me that I was not really in control.

And with every release, it seems to become more opinionated, more restrictive and more interested in turning the Mac into an oversized iPhone.

Then something changed.

Large language models arrived, and they effectively erased one of Linux’s greatest historical disadvantages.

The cost of troubleshooting collapsed.

For decades, the implicit contract of desktop Linux was that you could have freedom, but occasionally you would have to pay for it with several hours of your life, obscure forum posts and a terminal command written in 2014 by somebody named `xXArchWizardXx`.

Now I can show Claude Code an error, describe what is happening and let it inspect the system directly. So far, it has solved every Linux issue I have thrown at it.

One example, straight from the logs I keep of everything the AI changes on my system.

My laptop used to have a recurring problem. Every so often, after I closed the lid and put it in my backpack, instead of sleeping it would keep quietly drawing power, overheating in the bag until it crashed. I would arrive somewhere, pull out a worryingly hot machine, and be greeted by a crash screen.

The old me would have lost a weekend in forums. Instead, I described the symptoms and let the AI dig. It read the system logs, discovered that the laptop was only pretending to sleep, and set it up so that after half an hour in the bag it saves everything and switches off completely, then picks up exactly where I left it. It even traced part of the problem to a bug in Lenovo's firmware and worked around it.

A problem spanning firmware, kernel, bootloader and power management. My total contribution was describing symptoms and rebooting a few times. In 2008, that is a month of evenings ending with "suspend is broken, just shut it down."

I can still see and control everything. I just no longer have to investigate everything myself.

An LLM is effectively a permanently available system administrator.

This does not merely make Linux slightly more convenient. It fundamentally changes the equation.

The old trade-off was freedom versus convenience.

That trade-off is disappearing.

And it is disappearing while the rest of the ecosystem gets dramatically better on its own. Valve [made Linux gaming real](https://www.protondb.com/) with SteamOS and the Steam Deck, more manufacturers build machines with Linux in mind, and between native apps, the browser and compatibility layers, the software gap shrinks every year.

Then there is the newer generation of Linux environments that are not satisfied with merely being functional.

Projects like [Omarchy](https://omarchy.org/) bring taste, coherence and ambition to a space that has too often acted as though visual design was an optional bourgeois distraction.

I now use Hyprland ([Omarchy](https://omarchy.org/)'s default), customized quite a bit.

My computer does not feel like a collection of windows floating around a desktop. It feels like a system built around how I think.

I move through workspaces instantly with the keyboard or a trackpad gesture. Applications live in predictable places. My hands learn the machine. I navigate through mental maps and shortcuts instead of repeatedly hunting for windows, dragging rectangles around and waiting for ornamental transitions.

The interface gets out of the way.

The computer becomes fast not only in benchmarks, but in the way that actually matters: the distance between intending to do something and doing it becomes shorter.

That is what I had forgotten during my years with macOS.

A computer can become an extension of you.

But only when you are allowed to shape it.

With Linux, the operating system can look the way I want, behave the way I want and reflect the way I organize my thoughts.

<aside class="rice-bar">
  <p>That applies to this website too. Rice it, right here:</p>
  <div data-rice-chips></div>
</aside>

There has never been a better time to switch.

You get a computer that you truly own. Not just the aluminium object sitting on your desk, but the system itself. You can inspect it, modify it, remove the parts you hate and replace them with better ones. Make it minimal or extravagant, keyboard-driven or mouse-driven, beautiful or aggressively utilitarian.

Microsoft can make Windows worse.

Apple can make macOS worse.

And both of them are doing an excellent job of it.

Microsoft, honestly, let's not even talk about it. [Ads inside your own computer](https://www.pcworld.com/article/2313981/controversial-windows-11-start-menu-ads-begin-rolling-out.html). A Start menu so crowded with promoted apps, news widgets and blinking recommendations that it probably qualifies as a photosensitivity hazard. You press the button that used to launch your programs, and it tries to sell you something. Lately Microsoft has been [promising a calmer Windows with fewer ads](https://www.windowslatest.com/2026/03/22/microsoft-says-itll-make-windows-11-a-calmer-os-with-fewer-upsells-or-ads-in-the-start-menu-and-other-places/). Good to know they noticed.

Apple is more elegant about it, which somehow makes it worse. I was not a Mac user long enough to experience Tahoe, but the survivors [tell me it is hell](https://baty.net/posts/2025/11/i-kind-of-hate-mac-os-tahoe-and-liquid-glass/).

And that is only the annoying version of the problem. There is a darker one.

The world is drifting toward surveillance at a speed that would have sounded paranoid ten years ago. Governments buy analytics from companies like Palantir. And meanwhile, the operating system itself quietly started watching too. The flagship AI feature of modern Windows is Recall, a tool that [screenshots everything you do](https://www.computerworld.com/article/2123524/windows-recall-a-privacy-nightmare.html), every few seconds. It took a year of public outrage to make it ask permission first, and security researchers [keep demonstrating ways](https://www.geekwire.com/2026/one-year-after-its-rocky-launch-microsofts-windows-recall-still-raises-security-red-flags/) to get at the database anyway.

An operating system with a business model has an agenda. Linux does not have a business model.

Then there is the part nobody thinks about until it happens to them: being turned off. In 2025, the chief prosecutor of the International Criminal Court [lost access to his email](https://www.heise.de/en/news/Criminal-Court-Microsoft-s-email-block-a-wake-up-call-for-digital-sovereignty-10387383.html) after a US executive order sanctioned him. Microsoft [says the details are more complicated](https://www.theregister.com/2026/02/18/microsoft_asks_uk_parliament_to_correct_record/), and maybe they are. The outcome is not complicated: one of the most protected legal offices on Earth lost its email because of one government's signature, and the court responded by [leaving Microsoft entirely](https://www.irishlegal.com/articles/icc-to-ditch-microsoft-following-us-sanctions).

European governments noticed. Schleswig-Holstein is moving [thirty thousand government workers](https://www.theregister.com/2025/10/15/schleswig_holstein_open_source/) off the Microsoft stack. Denmark's Ministry of Digitisation [dropped Office 365](https://therecord.media/denmark-digital-agency-microsoft-digital-independence) for open source. They all use the same word: sovereignty. If states no longer trust their infrastructure to one vendor's goodwill, it is worth asking why you still do.

Nobody can ban you from your own computer.

And when a single company's upgrade policy misfires, the numbers get absurd. Windows 10 [died in October 2025](https://support.microsoft.com/en-us/windows/windows-10-support-has-ended-on-october-14-2025-2ca8b313-1946-43d3-b55c-2b95b107f281). An estimated [240 million working PCs](https://www.tomshardware.com/software/windows/microsofts-draconian-windows-11-restrictions-will-send-an-estimated-240-million-pcs-to-the-landfill-when-windows-10-hits-end-of-life-in-2025) cannot upgrade to Windows 11. That is roughly 480 million kilograms of potential e-waste. Those machines are not broken. They just do not meet a requirement Microsoft invented. Every single one of them runs Linux beautifully, and there is [an entire volunteer movement](https://endof10.org/) waiting to help you install it.

AI sharpens all of this, in both directions. I told you it erased Linux's greatest disadvantage. Here is the other half: it also raised the price of a closed operating system. An AI assistant is only useful if it can see what you are doing. Your screen, your files, your context. On a closed OS, that sight belongs to the vendor by default. On Linux, you can run the models on your own hardware, give them access to everything, and they answer to exactly one person. If an AI is going to have eyes on your whole life, you better own those eyes.

Linux does not belong to a CEO, a board or a trillion-dollar company trying to extract another percentage point of revenue from the way you open a file. It belongs to everyone, and every new user makes it stronger: one more reason for hardware makers to care, for software to show up, and for the industry to stop pretending that only two desktop operating systems exist.

Even the cultural tide is shifting.

[PewDiePie](https://www.youtube.com/@PewDiePie), the most-subscribed individual creator YouTube has ever had, is promoting Linux to an audience of a hundred million. [Theo](https://t3.gg), one of the biggest programming voices on YouTube, is promoting it. [DHH](https://world.hey.com/dhh), the creator of Ruby on Rails and a famous Apple fan for twenty years, went further: he built his own Linux setup so that others could follow. It is called Omarchy. You met it a few paragraphs ago.

These were not reluctant converts. Watching people like that walk away from macOS matters because it suggests the dissatisfaction is no longer confined to privacy obsessives, open-source ideologues and people who enjoy recompiling kernels on weekends.

<figure class="yt-embed">
  <button
    class="yt-facade"
    aria-label="Play: PewDiePie, I installed Linux (so should you). Loads YouTube."
    onclick="this.outerHTML='<iframe class=&quot;yt-frame&quot; src=&quot;https://www.youtube-nocookie.com/embed/pVI_smLgTY0?autoplay=1&quot; title=&quot;PewDiePie: I installed Linux (so should you)&quot; allow=&quot;autoplay; encrypted-media; picture-in-picture&quot; allowfullscreen></iframe>'"
  >
    <img src="/pew-linux.jpg" alt="PewDiePie: I installed Linux (so should you)" loading="lazy" width="1280" height="720" />
    <span class="yt-play">▶ press play to watch</span>
  </button>
  <figcaption>
    He explains most of this essay, but funnier. Nothing loads from YouTube
    until you press play.
  </figcaption>
</figure>

The Mac used to be the obvious machine for serious developers who wanted Unix without the inconvenience.

Linux has improved. The tooling has improved. The hardware has improved. AI has demolished most of the remaining inconvenience. Meanwhile, Apple keeps making the Mac feel less like a personal computer and more like a device you have been granted permission to operate.

People have been announcing the year of the Linux desktop since before I burned that Knoppix CD. It never arrives, and it never will, because it was never going to be a year on a calendar.

It arrives one person at a time, on the day you stop renting somebody else’s idea of a computer and start building your own.

And it matters more now than it did when I was 11. Everything I have built in the twenty years since, every company, every product, every strange side project, traces back to a computer that let me look inside. A generation is growing up on devices that can only consume: locked bootloaders, app stores, no filesystem, everything ready and nothing open. Linux is the last mainstream place where a computer is still something you can open, break and understand. That is where the next people who fix things will come from.

So the question is no longer why someone would switch to Linux.

The question is: what reason do you still have not to?
