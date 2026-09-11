export type ReviewSource = 'google' | 'yelp';

/** The four Southern California clinic locations. */
export type ClinicKey = 'torrance' | 'beverly-hills' | 'corona' | 'irvine';

export interface Review {
  quote: string;
  author: string;
  source: ReviewSource;
  rating: number;
  date: string;
  avatarUrl?: string;
  authorProfileUrl?: string;
  reviewUrl?: string;
  featured?: boolean;
  verified?: boolean;
  /** Location the excerpt came from. Omitted = the primary Incinta listing. */
  clinic?: ClinicKey;
}

/** One public review profile (e.g. the Google listing of a single location). */
export interface ClinicSourceProfile {
  name: string;        // 'Google' | 'Yelp'
  listingName: string; // how that location is named on the platform
  rating: number;
  count: number;
  url: string;
  color: string;
  capturedAt: string;
}

export interface ClinicProfile {
  key: ClinicKey;
  city: string;
  clinicName: string;
  address: string;
  sources: Partial<Record<ReviewSource, ClinicSourceProfile>>;
}

const GOOGLE_COLOR = '#4285F4';
const YELP_COLOR = '#D32323';

// Public review profiles by location. Ratings/counts reflect what each platform
// displays today, and every card links back to the live listing so patients can
// read the reviews at the source. Note that our Irvine / Corona / Beverly Hills
// locations appear on Google under the affiliated "Reproductive Fertility
// Center" (RFC Family) name; Torrance carries the INCINTA listing.
export const clinics: ClinicProfile[] = [
  {
    key: 'torrance',
    city: 'Torrance',
    clinicName: 'INCINTA Fertility Center — Torrance',
    address: '21545 Hawthorne Blvd, Pavilion B, Torrance, CA 90503',
    sources: {
      google: {
        name: 'Google',
        listingName: 'INCINTA Fertility Center',
        rating: 4.4,
        count: 72,
        url: 'https://www.google.com/maps/search/?api=1&query=Incinta+Fertility+Center+Torrance+CA',
        color: GOOGLE_COLOR,
        capturedAt: '2026-09-11',
      },
      yelp: {
        name: 'Yelp',
        listingName: 'INCINTA Fertility Center',
        rating: 4.2,
        count: 48,
        url: 'https://www.yelp.com/biz/incinta-fertility-center-torrance',
        color: YELP_COLOR,
        capturedAt: '2026-09-11',
      },
    },
  },
  {
    key: 'beverly-hills',
    city: 'Beverly Hills',
    clinicName: 'Reproductive Fertility Center — Beverly Hills',
    address: '8635 W 3rd St, Suite 1170W, Los Angeles, CA 90048',
    // Awaiting the location's public Google/Yelp profile data.
    sources: {},
  },
  {
    key: 'corona',
    city: 'Corona',
    clinicName: 'Reproductive Fertility Center — Corona',
    address: '400 E Rincon St, 1st Floor, Corona, CA 92879',
    sources: {
      google: {
        name: 'Google',
        listingName: 'Reproductive Fertility Center (RFC)',
        rating: 3.8,
        count: 46,
        url: 'https://www.google.com/maps/search/?api=1&query=Reproductive+Fertility+Center+400+E+Rincon+St+Corona+CA+92879',
        color: GOOGLE_COLOR,
        capturedAt: '2026-09-11',
      },
      yelp: {
        name: 'Yelp',
        listingName: 'Reproductive Fertility Center',
        rating: 4.4,
        count: 120,
        url: 'https://www.yelp.com/biz/reproductive-fertility-center-corona',
        color: YELP_COLOR,
        capturedAt: '2026-09-11',
      },
    },
  },
  {
    key: 'irvine',
    city: 'Irvine',
    clinicName: 'Reproductive Fertility Center — Irvine',
    address: '16300 Sand Canyon Ave, 9th Floor, Irvine, CA 92618',
    sources: {
      google: {
        name: 'Google',
        listingName: 'Reproductive Fertility Center (RFC Family)',
        rating: 3.7,
        count: 39,
        url: 'https://www.google.com/maps/search/?api=1&query=Reproductive+Fertility+Center+16300+Sand+Canyon+Ave+Irvine+CA+92618',
        color: GOOGLE_COLOR,
        capturedAt: '2026-09-11',
      },
      yelp: {
        name: 'Yelp',
        listingName: 'Reproductive Fertility Center',
        rating: 4.2,
        count: 126,
        url: 'https://www.yelp.com/biz/reproductive-fertility-center-irvine',
        color: YELP_COLOR,
        capturedAt: '2026-09-11',
      },
    },
  },
];

/** Platform profiles of one clinic, in a stable order (Google first, then Yelp). */
export const sourcesOf = (c: ClinicProfile): ClinicSourceProfile[] =>
  (Object.values(c.sources) as (ClinicSourceProfile | undefined)[]).filter(
    (s): s is ClinicSourceProfile => Boolean(s),
  );

/** Locations that currently have at least one public review profile. */
export const clinicsWithReviews = clinics.filter((c) => sourcesOf(c).length > 0);

/** Every public review profile across all locations — powers the aggregate + JSON-LD. */
export const allSources: ClinicSourceProfile[] = clinics.flatMap(sourcesOf);

const totalCount = allSources.reduce((n, s) => n + s.count, 0);
const totalStars = allSources.reduce((n, s) => n + s.rating * s.count, 0);
/** Brand-level weighted average across every public profile we publish. */
export const aggregateRating = Number((totalStars / totalCount).toFixed(2));
export const aggregateCount = totalCount;

// Verbatim excerpts from public Google / Yelp reviews of Incinta Fertility Center.
// Sourced from the clinic's real review profiles; ellipsis indicates the original was truncated.
export const reviews: Review[] = [
  // ---- Google ----
  { source: 'google', quote: "We are deeply grateful to this fertility center for their professional assistance and heartfelt support.", author: 'Wei Li', rating: 5, date: '1 year ago', clinic: 'torrance', featured: true, verified: true, avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjV4Bcy3SlwByY4XADfsOezcF8tT8ce3yNBTpEzw-XnCbk9gLrA=w160-h160-p-rp-mo-br100', authorProfileUrl: 'https://www.google.com/maps/contrib/107139685321099761023/reviews?hl=en-US', reviewUrl: 'https://www.google.com/maps/search/?api=1&query=Incinta+Fertility+Center+Torrance+CA' },
  { source: 'google', quote: "His professionalism and expertise gave me confidence and peace of mind during what can be a very stressful journey.", author: 'T.L.', rating: 5, date: '3 months ago', clinic: 'corona', featured: true, verified: true, avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjWCcd0EphvugCZi7XnV_4yQZX_sTSqaNlEMFBLNruE2uc1EA58=w160-h160-p-rp-mo-br100', authorProfileUrl: 'https://www.google.com/maps/contrib/117140529024619602031/reviews?hl=en-US', reviewUrl: 'https://www.google.com/maps/search/?api=1&query=Reproductive+Fertility+Center+400+E+Rincon+St+Corona+CA+92879' },
  { source: 'google', quote: "We are incredibly grateful to everyone at Reproductive Fertility Center for making our dream of becoming parents come true.", author: 'Nisha', rating: 5, date: '1 month ago', clinic: 'irvine', featured: true, verified: true, avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjUZ7EGbZ_Cr5Mg_v9jFxdbck5vgyUSkmektJag43CM_FfJUQQuUmA=w160-h160-p-rp-mo-br100', authorProfileUrl: 'https://www.google.com/maps/contrib/107586062463952330288/reviews?hl=en-US', reviewUrl: 'https://www.google.com/maps/search/?api=1&query=Reproductive+Fertility+Center+16300+Sand+Canyon+Ave+Irvine+CA+92618' },
  { source: 'google', quote: "I have worked with this clinic twice, I am a surrogate. Dr.Lin is amazing both times my embryo transfer was successful on the first time, my ivf coordinator was always very informative the Entire journey until I was able to go to my OB", author: 'Taylor Zhang', rating: 5, date: '4 years ago' },
  { source: 'google', quote: "Me and my husband tried several years but didn't get a baby so we decided to try IVF. I accidentally went through Incinta from Google and decided to give it a try. And it's worthy. I'm 1 month pregnant now and so glad I have Dr Lin and…", author: 'Shen Xianqi', rating: 5, date: '3 months ago' },
  { source: 'google', quote: "We had a wonderful experience throughout our IVF journey. The entire team was professional, caring, and supportive every step of the way. A special thank you to Lily, who was always patient, kind, and incredibly helpful. She answered all of…", author: 'Keon Hua', rating: 5, date: '2 months ago' },
  { source: 'google', quote: "My experience at Incinta Fertility Clinic was very positive. The clinic is well-organized, and the entire team is knowledgeable and professional in fertility care.…", author: 'Sievneang Cheatchhun', rating: 5, date: '2 months ago' },
  { source: 'google', quote: "这次在 Cinta Fertility Center 的体验真的很好，特别感谢林医生和 Lily ❤️ 从检查到每一次沟通，她们都非常耐心、细心，也给了我很多安心感。尤其是在我紧张和焦虑的时候，Lily…", author: 'Jiaxi', rating: 5, date: '3 months ago' },
  { source: 'google', quote: "We had a good experience at Incinta. What sets them apart is the staff, they are always greeted with a smile and treated like family, never just a number. The administrative staff made the complex billing and scheduling process easy. Nurses…", author: 'Ericka Penaloza', rating: 5, date: '4 months ago' },
  { source: 'google', quote: "We are incredibly grateful to this clinic for helping us grow our family. After such a positive experience the first time, coming back for our second child felt like the right decision—and once again, they exceeded our expectations. The…", author: 'Cameron Sentance', rating: 5, date: '4 months ago' },
  { source: 'google', quote: "Incinta is a highly professional, warm, and caring fertility clinic. Throughout my IVF journey, they provided the most expert care, and all the medical staff were incredibly patient and attentive to my feelings every step of the way. I feel…", author: 'Christine Mo', rating: 5, date: '6 months ago' },
  { source: 'google', quote: "We have a very good experience at this clinic. The staff were welcoming from the moment we arrived, and the waiting time was reasonable. The doctor listened carefully to our concerns and explained the process in a way that was easy to…", author: 'Has H', rating: 5, date: '9 months ago' },
  { source: 'google', quote: "I'm currently about 6 weeks pregnant after my first round of IVF through Incinta Fertility, and my husband and I couldn't be happier. From the moment we began this journey, we felt supported, informed, and genuinely cared for by everyone at…", author: 'Chen H.', rating: 5, date: '10 months ago' },
  { source: 'google', quote: "Incinta team members are helpful navigating through the process. If you have any questions, don't hesitate to ask questions. They have done this many times so things could be normal for them but for us, especially going through for the…", author: 'Yuya Orime', rating: 5, date: '6 months ago' },
  { source: 'google', quote: "I chose this clinic for my secondary infertility treatment. I transferred six embryos from my home country to this clinic, had four of them tested with PGT-A, and kept the remaining two untested. As a result of the PGT-A, two normal embryos…", author: 'Sakura Lily', rating: 5, date: '8 months ago' },
  { source: 'google', quote: "Fertility treatment can be intimidating, but this clinic made the process feel manageable and humane. From appointments to follow-ups, the staff was organized, responsive, and compassionate without being overly sentimental.…", author: 'Ashley Mayo', rating: 5, date: '8 months ago' },
  { source: 'google', quote: "I'm currently 5 weeks pregnant with our first baby via the first round of IVF. Going through this fertility journey, I've had a wonderful experience at the Incinta clinic. Both my husband and I felt supported and understood by the entire…", author: 'Flora Cui', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "Truly a wonderful place. At Incinta, from my first phone call with Charlie, I immediately felt supported. I had all the anxiety. I had all the questions. Laurene and Lily were ready for me. My husband and I are overjoyed that we are now…", author: 'Christina Bazak', rating: 5, date: '9 months ago' },
  { source: 'google', quote: "Everyone at Incinta has been so helpful, so kind, and so caring. Their constant availability to answer questions and offer support has been unmatched in my fertility journey. Dr. Lin is confident and his vast experience has given me what we…", author: 'Frazier Hurwin', rating: 5, date: '11 months ago' },
  { source: 'google', quote: "We are incredibly grateful to the entire team at Incinta Fertility for their care throughout our IVF journey. From the very beginning, the staff was not only thorough and professional, but also genuinely compassionate and attentive —…", author: 'Mick Trinidad', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "We are deeply grateful to this fertility center for their professional assistance and heartfelt support. From the initial consultation to every step of the treatment process, Dr. James Lin and nurses were incredibly patient and attentive,…", author: 'Wei Li', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "My husband and I couldn't be more happy with Incinta. As soon as you walk in you feel welcomed and the reception area is stunning. All the staff from the receptionist, patient relations Charlie, our nurses Lily and Alyson to Dr. Lin were so…", author: 'Chelsey Grigsby', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "Going through the IVF journey really made me realize how important it is to find a reliable and reassuring clinic.…", author: 'YINGJIAO KANG', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "After more than two years of trying on our own without success, we decided to seek help—and everything started to fall into place once we came to Incinta Fertility Center. I'm thrilled to share that I finally became pregnant thanks to their…", author: 'Niki Y', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "My journey with Incinta Fertility began in 2024 when my husband and I made the big decision to seek Dr. Lin's expertise and undergo IVF. We hoped to build a family with their support. After one round of IVF, we were fortunate to have some…", author: 'Ling M', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "My wife and I have been on our journey with fertility for close to 4 years. We decided to seek help. For the last year we have worked with the office and have nothing but amazing things to say about the services they provided us. From the…", author: 'Jonathan B.', rating: 5, date: '10 months ago' },
  { source: 'google', quote: "The doctor, Lin was so knowledgeable and explained the treatment options in detail, which my wife and I appreciated a lot. The clinic is very clean, and the staff is generally professional and helpful. Especially Diane took care of very…", author: 'Sugita Daisuke', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "Incinta Fertility Center has been a beacon of hope for us during one of the most challenging journeys of our lives.…", author: 'Amanda Brimmage Dudley', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "We have been trying to get pregnant for more than 10 years. We even had 5 IUI with two miscarriages and one D&C before we decided to proceed with IVF. And when we decided, we have interviewed 3 IVF clinics since 2018. And in 2021 when we…", author: 'michelle aligada', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "My experience of going through IVF at Incinta Fertility Clinic has been excellent. The doctors and staff are all very kind, informative and genuinely care about my health and well-being through this stressful process. They also respond…", author: 'Kyree', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "I am truly honored to be a surrogate mother, and this is my first time participating in a surrogacy journey.…", author: 'Porla Garcia', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "I've been coming to Incinta since February this year, after having visited several other clinics and not feeling comfortable moving forward with them on my fertility journey. During my time here, I must say that I am confident that I have…", author: 'Erica Skeels', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "We had great experience with this clinic. Our care real are so nice and attentive. They went above and beyond in guiding us with our journey. Thank you to all the Healthcare team who helped us build our family.", author: 'Neisha Rivera', rating: 5, date: '8 months ago' },
  { source: 'google', quote: "After years of struggling with infertility, having testing done, and three failed IUIs with our primary healthcare provider, my wife and I decided that we would have better opportunities pursuing IVF. We knew that this option was much more…", author: 'Matthew Hallsted', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "我在Incinta Fertility有过一次奇妙的经历。从开始到结束，整个团队都很专业、支持和非常善良。我特别想感谢Hong和Lily——他们让整个过程对我来说更加顺利。Hong和Lily 在回答我所有的问题时总是耐心而彻底，他们在我的整个旅程中给了我很多鼓励和情感支持。他们的关心和关注让我感到安全和真正受到照顾。…", author: 'Arorua Liu', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "I signed up for this clinic's mailing list as part of the requirement for my son to participate in the activity this clinic was offering at the Liberty Station Halloween event on October 26, 2025. While I understand that standing in line is…", author: 'Nathaniel Oleson', rating: 5, date: '10 months ago' },
  { source: 'google', quote: "My partner and I started our journey with Incinta in the fall 2024. From the moment we walked in, staff made us feel so welcome, were knowledgeable and never pressured us to commit. The clinic is pristine and after doing some research, a…", author: 'Melissa V', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "在诊所顺利完成了IVF单周期的疗程，林医生性格开朗，用药效果不错。整体来说，进周打针和b超都挺顺利，身体没有出现不适，做b超的医生和护士都很nice让人心情放松，打针指引很详细，按照步骤完成就可以了。取卵手术也是林医生做的，体验意外的轻松，睡一觉就结束了，后续也没有什么不舒服的。我取卵成熟的卵泡有13个形成4个高等级的囊胚，最终经过PGT筛查有了两枚健康的胚胎，祈祷接下来一切顺利，宝宝健康出生~~", author: 'zhan zhan', rating: 5, date: '1 year ago' },
  { source: 'google', quote: "I am incredibly grateful for Incinta and everyone that has guided me through this process.After years of undiagnosed PCOS and unable to get pregnant I am currently a little under 11 weeks pregnant and I couldn't be happier. This is your sign to take that first step and reach out.", author: 'guadalupe gonzalez', rating: 5, date: '7 months ago' },

  // ---- Yelp (sourced from the clinic's public Yelp profile) ----
  { source: 'yelp', quote: "Me and my husband tried several years but didn't get a baby so we decided to try IVF.", author: 'Shen X.', rating: 5, date: 'May 13, 2026', clinic: 'torrance', verified: true, avatarUrl: 'https://s3-media0.fl.yelpcdn.com/photo/_UajYf1nn-7ZzoeCPLkryg/60s.jpg', authorProfileUrl: 'https://www.yelp.com/user_details?userid=y5KfGTOmeK2NM7ptjDOEoQ', reviewUrl: 'https://www.yelp.com/biz/incinta-fertility-center-torrance' },
  { source: 'yelp', quote: "Amazing support throughout the process. We have Leslie Ortiz as our assigned coordinator and she has been so patient and quick to respond.", author: 'Arielle C.', rating: 5, date: 'Apr 6, 2026', clinic: 'corona', verified: true, avatarUrl: 'https://s3-media0.fl.yelpcdn.com/photo/DBbVW5e7fTFDvIorSoGZmw/60s.jpg', authorProfileUrl: 'https://www.yelp.com/user_details?userid=9IVjLyad56jZGdFKdTXFzg', reviewUrl: 'https://www.yelp.com/biz/reproductive-fertility-center-corona' },
  { source: 'yelp', quote: "IVF is a very difficult journey but with the right team you will feel supported throughout the process.", author: 'Famela P.', rating: 5, date: 'Jan 19, 2026', clinic: 'irvine', verified: true, avatarUrl: 'https://s3-media0.fl.yelpcdn.com/photo/q7U_yIwIuwsoqCYiQtkEiA/60s.jpg', authorProfileUrl: 'https://www.yelp.com/user_details?userid=e4wvSgLAQASO1PlHAA1nWg', reviewUrl: 'https://www.yelp.com/biz/reproductive-fertility-center-irvine' },
];
