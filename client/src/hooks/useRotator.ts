import { useState, useEffect, useCallback, useRef } from 'react';

// Enhanced Static Data Content - Longer, More Emotional & Romantic
const LOVE_POEMS = [
  `My love for you is not the kind that fits neatly into words—it spills over, like dawn refusing to be contained by the horizon. You are the reason my heart learned a new language, one spoken only in the quiet moments when the world forgets to exist and all that remains is the warmth of you beside me. In your eyes, I have found the kind of home I used to write poems about, never believing it could actually exist until you held my hand and proved that some dreams do come true.

  Every version of me that existed before you was just a rough draft, practicing for the day I would finally become the person worthy of your love. You have rewritten my soul in ink made of kindness and starlight, and I will spend every breath I have left trying to be the poetry your heart deserves. When I say forever, I don't mean until the seasons change or until the stars burn out—I mean beyond even that, into the places where time itself forgets to count the moments, because each one with you is too precious to measure.`,

  `If I could capture the sound of your laughter and bottle it, I would sell sunshine to the darkest corners of the world—because that is the kind of light you carry. You are not just someone I love; you are the reason I believe in magic again, the proof that some things in this universe are too beautiful to be explained by science or chance. When you sleep beside me, I stay awake just to watch the gentle rise and fall of your chest, marveling at how someone so ordinary in their humanity can be so extraordinary in my heart.

  I have loved you in ways I never knew I was capable of—quietly, when the world was too loud; fiercely, when you needed someone to fight for you; gently, when all you wanted was to be held. And still, after all of that, I feel like I've only just begun to understand the depth of what you mean to me. You are the first thought that greets me when I wake and the last prayer my heart whispers before sleep takes me. In between, you are everything—the air, the light, the reason. Always the reason.`,

  `There is a version of me that only exists when I'm with you—softer, braver, more alive than I ever thought possible. You didn't just walk into my life; you walked into the rooms of my heart that I had locked away, afraid no one would understand the chaos inside. But you didn't run. You stayed. You sat with my shadows until they learned to dance in your presence. That is the kind of love that changes people—the kind that doesn't just heal wounds but turns them into stories worth telling.

  I want to grow old with you in ways that have nothing to do with age. I want to memorize the map of your hands until I could draw them blindfolded. I want to be the one who brings you tea on days when the world feels heavy, and the one who spins you around the kitchen when joy becomes too much to contain. I want to prove, every single day, that love isn't just a word we say—it's the life we build, brick by brick, moment by moment, until we look back and realize we've built something eternal.`,

  `Do you remember the first time we held hands? I do. I remember thinking that if the world ended right then, I would have died complete—because in that small gesture, I felt the entire universe aligning. Your fingers intertwined with mine like they had been searching for each other across lifetimes, like every lonely moment before you was just practice for the warmth of finally belonging to someone. And I do belong to you—not in the way possessions belong to people, but in the way the moon belongs to the tide, drawn by something invisible yet undeniable.

  I want to be your safe place when the world becomes too much. I want to be the silence you seek when noise overwhelms, the calm when chaos knocks at your door. But more than that, I want to be your adventure—the one who reminds you that life is still magical, still worth dreaming about, still full of yet. With you, I am never surprises we haven't discovered lost. Even when we don't know where we're going, I know who I'm going with—and that makes every road worth traveling.`,

  `You are the most beautiful thing that has ever happened to me, and I don't mean that in the way people say it casually. I mean it in the way the ocean means the shore—inevitably, eternally, with every wave crashing because it has no other choice. Loving you is not a decision I made; it's a truth I discovered, like gravity or the changing of seasons. It simply is. And because it simply is, it will simply always be—no matter what comes, no matter what changes, no matter how many years try to soften its edges.

  When I think about our future, I don't see a specific house or a particular street—I see you. I see your face across the breakfast table, your hand reaching for mine in the dark, your voice calling my name like it's the only word that matters. I see us laughing at things that won't be funny to anyone else, crying over losses only we understand, holding each other through storms and sunsets alike. I see a lifetime of ordinary moments made extraordinary simply because you are in them. And that, my love, is more than enough. That is everything.`,
];

const LOVE_MESSAGES = [
  `Sometimes I catch myself smiling for no reason, and then I realize—there is a reason. You exist. Somewhere in this vast, chaotic world, you are breathing the same air, walking the same earth, living a life that somehow intersects with mine. And that thought alone is enough to make even the darkest days feel a little brighter. You have become my default happiness, the place my mind runs to when it needs comfort, the first name my heart writes when it wants to celebrate.

  I hope you know how deeply you are loved—not just for the beautiful parts of you that you share so freely, but for the messy, complicated, human parts too. I love the way you laugh until you snort. I love the way you furrow your brow when you're concentrating. I love the way you talk in your sleep, mumbling secrets even you don't remember in the morning. I love all of it—because all of it is you, and you are the most wonderful collection of moments I have ever had the privilege of witnessing.`,

  `If I had to describe loving you in one word, I couldn't. Because one word isn't enough to capture the way my heart races when you walk into a room, or the peace that settles over me when you're finally home. Loving you is not a single feeling—it's a symphony, a thousand emotions playing at once, sometimes loud and chaotic, sometimes soft and tender, but always, always beautiful. You have taught me that love isn't about finding someone perfect; it's about finding someone who makes you want to be a better version of yourself.

  Before you, I thought I knew what happiness felt like. But you didn't just add to my happiness—you redefined it entirely. You showed me that joy can be quiet and still, not always loud and bursting. You showed me that being understood is more intimate than being admired. You showed me that love, real love, is not about grand gestures—it's about showing up, every single day, choosing each other even when it's hard, even when it's boring, even when the world tries to pull you apart. And I choose you. Today, tomorrow, always.`,

  `There are moments when I look at you and feel overwhelmed by the sheer luck of having you in my life. Not because you're perfect—perfection is overrated. But because you're real. You're honest and flawed and trying your best, and that authenticity is more beautiful than any carefully constructed facade could ever be. You let me see the parts of you that you hide from the world, and in doing so, you gave me the greatest gift: your trust. I will spend my life making sure I deserve it.

  I want to be the person you turn to when words fail—the one who understands your silences, who reads your eyes when your mouth can't speak. I want to be your anchor when life tries to sweep you away, and your wings when you're ready to fly. I want to be everything you need, but more importantly, I want to help you become everything you're meant to be. Because your dreams are my dreams now, your happiness my happiness, your heart my home. And homes are not just places—they're promises.`,

  `Do you ever think about how unlikely this is? Out of billions of people, across countless moments in time, we found each other. Not just found—recognized. Like two pieces of a puzzle that had been searching across oceans and years, finally clicking into place. It sounds like something from a movie, but it's our reality. And some nights, when I can't sleep, I just lie there marveling at it—at you, at us, at the beautiful accident of existence that brought us together.

  I never believed in soulmates before you. The idea seemed too romantic, too convenient, like something people invented to make themselves feel special. But then you came along and shattered every doubt I ever had. You are not just someone I love—you are someone I was always meant to love. Every heartbreak, every wrong turn, every lonely night before you—it was all leading here. To this moment. To us. And I would go through it all again, a thousand times over, just to end up right here, right now, loving you.`,

  `You are the first thing I think about when I wake up and the last thought I release when I fall asleep. In between, you are the background music to my day—sometimes quiet, sometimes front and center, but always, always there. I don't know how to explain what you've done to me, except to say that my world before you feels gray now, like I was living in black and white and didn't even know color existed. You didn't just add color—you painted entire galaxies across my sky.

  I love you in ways that words can't reach. I love you in the spaces between sentences, in the pauses where language fails and feeling takes over. I love you when you're happy and when you're sad, when you're strong and when you're falling apart. I love you not despite your shadows, but because of them—because they're part of your story, and your story is the only one I want to read for the rest of my life. So stay. Stay as long as you can, as long as you want, as long as forever allows. And even after that—find me again. I'll be waiting.`,
];

const SAD_POEMS = [
  `The house still remembers your footsteps. I hear them sometimes, late at night, when the wind carries old sounds through empty rooms. It's funny how places hold onto people—how a corner of the kitchen can still echo with laughter that stopped months ago, how a pillow can still smell like hair that hasn't touched it in forever. I used to think grief was something you felt. Now I know it's something you live in—a house with no doors, a room with no windows, a heart that keeps beating even when it doesn't want to.

  I thought time was supposed to heal everything, but no one tells you that healing isn't the same as forgetting. It's not even the same as hurting less. Healing is just learning to carry the weight differently, to shift it from one shoulder to the other so you can keep walking. But the weight never disappears. It's always there—the memory of your voice, the ghost of your touch, the absence that has become more familiar than any presence ever was. I carry you with me everywhere, and I'm starting to believe I always will.`,
  
  `There are days when missing you feels like breathing—automatic, unconscious, necessary. I don't even notice I'm doing it until someone asks if I'm okay and I realize I've been staring at nothing for an hour, lost in the space where you used to be. Grief is strange that way. It doesn't announce itself. It doesn't knock. It just moves in and rearranges the furniture of your soul until you forget what the room looked like before.

  I saw a flower growing through a crack in the pavement today, and I thought of us. How we tried to bloom in a place that wasn't meant for growing. How we fought against concrete and cold, believing love alone could change the conditions. And maybe it did, for a while. Maybe we did bloom—briefly, beautifully, against all odds. But some flowers aren't meant to last forever. Some are just meant to remind the world that beauty exists, even in impossible places, even if only for a moment. That was us. That was beautiful. That was enough, even though it didn't feel like it.`,
  
  `I keep writing letters I'll never send. Pages and pages of words you'll never read, confessions you'll never hear, love you'll never know still exists. It's my way of keeping you alive—not in the world, but in me. Because letting go doesn't mean forgetting. It means remembering without reaching, loving without expecting, holding on without holding back. And I'm trying. God knows I'm trying. But some days, the trying is all I can do.

  The hardest part isn't the loneliness—it's the moments of happiness that still feel incomplete because you're not here to share them. The sunset that would have made you gasp. The song that would have made you dance. The joke only you would have found funny. I collect these moments like seashells on an endless beach, filling my pockets with beauty I have no one to show. And I wonder if you're doing the same somewhere—collecting moments for someone who isn't there anymore, filling empty spaces with memories that still ache.`,
  
  `I dreamed of you last night. You were laughing—that real laugh, the one that crinkled your eyes and made everyone around you smile just from hearing it. I woke up reaching for you, my hand finding nothing but cold sheets and the cruel realization that dreams are the cruelest kindness—giving us back what we've lost, only to take it away again when morning comes. I lay there for an hour, trying to fall back asleep, trying to find you again in that place where you still exist.

  But maybe that's what love becomes when someone leaves—not gone, just relocated. Existing in dreams instead of days, in memory instead of moments. And if that's the only way I can have you now, I'll take it. I'll take every dream, every memory, every fleeting glimpse of you in a stranger's face or a familiar song. I'll take the ache because it means I still feel. I'll take the tears because they mean you were real. I'll take all of it—the grief, the longing, the endless missing—because it's all I have left of you. And even broken, even incomplete, even filled with pain—it's still you. And you are still worth everything.`,
  
  `They say time heals all wounds, but they don't tell you that healing isn't linear. It doesn't move forward in a straight line—it circles back, revisits old pain, opens scars that you thought had closed forever. Today was one of those days. I heard your name and my heart stopped, just for a second, like it was still waiting for you to walk through the door. Like all these months meant nothing, and I was right back at the beginning, drowning in the same ocean I thought I had finally learned to swim in.

  Grief is just love with nowhere to go. I heard that once, and it's the only thing that makes sense to me now. Because what I feel for you hasn't diminished—it's still here, as vast and deep as ever. But instead of flowing toward you, it just circulates inside me, finding new chambers of my heart to fill, new corners of my soul to occupy. It's love without a destination. Love that has become its own home. And maybe that's okay. Maybe love doesn't always need somewhere to go. Maybe sometimes, it's enough that it simply is—proof that you existed, proof that you mattered, proof that some things don't end just because they're over.`,
];

const SAD_MESSAGES = [
  `I hope you're happy. I mean that—even though it hurts to say, even though I wish I was the one making you happy, even though a part of me still hopes you'll realize you made a mistake and come back. Despite all of that, I genuinely hope you're happy. Because your happiness was always my priority, even when it stopped including me. That's what real love does, I think. It doesn't disappear just because the relationship did. It transforms into something quieter, something that wants the best for you even when the best isn't us anymore.

  I still think about you at the strangest times. Not when I'm sad or lonely—those moments I expect. But when I'm happy, too. When something good happens and my first instinct is still to tell you. When I hear a song I know you'd love. When I see a place we talked about visiting and for a split second, I forget that we're not "we" anymore. Those moments are the hardest—the ones where joy and grief mix together, creating something bittersweet that I don't have a name for. I don't know if that will ever stop. Maybe it won't. Maybe some people leave footprints on our hearts that never fade, no matter how much time passes or how many miles come between us.`,
  
  `I saw you today. From across the street, not close enough to speak, but close enough to remember. You looked different—new haircut, new style, new version of yourself that I don't know anymore. And yet, underneath all the new, you were still you. Still the person I fell in love with. Still the person I couldn't keep. I wanted to cross that street so badly. I wanted to say something—anything—just to hear your voice again. But I didn't. I stayed on my side, and you stayed on yours, and the distance between us felt like a summary of everything we became.

  Sometimes I wonder if you think about me too. If you ever hear a song and remember dancing with me in the kitchen. If you ever smell a certain perfume and think of how I used to wear it just because you liked it. If you ever lie awake at night and wonder if I'm okay, the way I wonder about you. I hope you do. Not because I want you to be sad—I would never wish that. But because I want to believe I mattered. I want to believe that what we had wasn't just a chapter you closed and forgot, but a book that left marks on you the way it left marks on me.`,
  
  `I'm learning to be okay with not knowing. Not knowing if you ever really loved me. Not knowing if I was enough. Not knowing what went wrong or when exactly we started becoming strangers who shared a bed. I'm learning to accept that some questions don't have answers, or at least not answers I'll ever hear. And maybe that's the hardest part of letting go—not the absence of the person, but the absence of closure. The silence where explanations should be. The empty space where understanding was supposed to live.

  But here's what I do know: I loved you. Truly, deeply, completely. I loved you in ways I didn't know I was capable of. I loved you when it was easy and when it was impossible. I loved you even when loving you meant losing parts of myself I never got back. And that love wasn't wasted, even if it ended. It taught me things about myself I never would have learned otherwise. It showed me that I'm capable of depth I never knew I had. It proved that my heart can feel things that don't fit into words. So thank you—for the love, for the lessons, for the pain even. Because all of it made me who I am. And who I am, scars and all, is someone who still believes in love. Even after everything.`,
  
  `There's a version of my life that I still visit sometimes—the one where we made it. Where we fought harder, stayed longer, loved through the hard parts instead of letting them tear us apart. In that version, we're old now. Grey hair and wrinkled hands and inside jokes that no one else understands. In that version, we made it to the other side of everything that tried to break us. I visit that version less often now, because it hurts too much to imagine a future I'll never have. But sometimes, late at night, when I can't sleep and my mind wanders where it shouldn't, I find myself there again—wondering what we would be if we had been braver.

  The truth is, I don't know if bravery would have saved us. Maybe some things are broken beyond repair, no matter how hard you try. Maybe we were never meant to make it to the other side—maybe we were just meant to be each other's bridge to somewhere else. And if that's true, then I'm grateful. Grateful for the time we had, the love we shared, the person I became because of you. You were not my forever, but you were my for now—and for now was beautiful enough to last me a lifetime.`,
  
  `I deleted your number today. Not because I wanted to, but because I had to. Because keeping it felt like keeping a door open that was never going to open again. Because every time my phone buzzed, a tiny part of me hoped it was you—and that hope was slowly killing me. So I deleted it. And then I cried. Not because I stopped caring, but because I finally started caring about myself enough to let you go. They say healing isn't linear, and they're right. Today I moved forward. Tomorrow I might move back. But at least I'm moving.

  I want you to know that I don't regret us. Not a single moment. Not the laughter or the tears, not the fights or the making up, not the quiet mornings or the chaotic nights. I don't regret loving you, even knowing how it would end. Because some people come into our lives not to stay, but to change us. And you changed me. You made me softer and stronger, more open and more cautious, more aware of what I deserve and what I'll never settle for again. You were a lesson wrapped in a blessing, a heartbreak disguised as a gift. And I will carry what you taught me into every love that follows—grateful for you, even from afar.`,
];

type Category = 'love-poems' | 'love-messages' | 'sad-poems' | 'sad-messages';

export function useRotator(category: Category, intervalMs: number = 60000) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const content = {
    'love-poems': LOVE_POEMS,
    'love-messages': LOVE_MESSAGES,
    'sad-poems': SAD_POEMS,
    'sad-messages': SAD_MESSAGES,
  }[category];

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % content.length);
    // Pause auto-rotation when user manually navigates
    if (!isPaused) {
      setIsPaused(true);
    }
  }, [content.length, isPaused]);

  const previous = useCallback(() => {
    setIndex((prev) => (prev - 1 + content.length) % content.length);
    // Pause auto-rotation when user manually navigates
    if (!isPaused) {
      setIsPaused(true);
    }
  }, [content.length, isPaused]);

  const goTo = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < content.length) {
      setIndex(newIndex);
      // Pause auto-rotation when user manually navigates
      if (!isPaused) {
        setIsPaused(true);
      }
    }
  }, [content.length, isPaused]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Auto-rotation timer
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [intervalMs, content.length, isPaused]);

  return {
    current: content[index],
    index,
    total: content.length,
    next,
    previous,
    goTo,
    isPaused,
    pause,
    resume,
    toggle,
  };
}
