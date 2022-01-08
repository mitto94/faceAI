export const Color : { [key: string]: any} = {
	zero: "#524F4A",
	first: "#E5E3D7",
	second: "#A6A998",
	third: "#D9C2B0",
}
export const AgeSentence = {
	under: [
		"정말 동안이시네요~!",
		"당신은 AI가 인정한 동안!",
		"동안이라는 칭찬\n많이 들으시겠는데요?"
	],
	over: [
		"나이가 머.. 중요하나요~ ㅎㅎ",
		"마음만 어리면 됐죠~~",
		"나이는 숫자에 불과해요 :)",
		"성숙한 거겠죠...? ㅎ",
		"괜찮아요~!\n곧 나이를 찾아갈 거에요"
	],
	same: [
		"정확하게 예측 성공~\n사실 더 어려 보이세요 :)"
	]
}
export const EnAgeSentence = {
	under: [
		"You look so young!",
		"You're a baby face\nrecognized by AI!",
		"I'm sure you'll get\na lot of compliments\nfor looking young?"
	],
	over: [
		"Age... Is it important?",
		"It's important that\nyour heart is young.",
		"Age is just a number :)",
		"I'm sure it's mature, right?",
		"It's okay!\nou're going to find your age soon"
	],
	same: [
		"Precisely predicted success~~\nActually, you look younger :)"
	]
}
export const Relation : { [key: string]: any} = {
	family: {
		first: ["한쪽은 아빠, 한쪽은 엄마!"],
		second: ["가족인듯 가족아닌\n가족같은 너~"],
		third: ["누가 봐도 가족이네요 ㅎㅎ"]
	},
	friend: {
		first: ["얼굴만은 남남!"],
		second: ["서로 기분 나쁜 거 아니죠?"],
		third: ["친구가 아니라 가족 아니에요?"]
	},
	couple: {
		first: ["서로 다른 모습이\n매력으로 다가왔나 봐요!"],
		second: ["둘이 너무 어울려요!"],
		third: ["함께 지내다 보면 닮는다더니 ㅎㅎ"]
	}
	
}
export const EnRelation : { [key: string]: any} = {
	family: {
		first: ["One is dad, the other is mom!"],
		second: ["It looks like a family\nbut it doesn't seem like it~"],
		third: ["It's obviously family. lol"]
	},
	friend: {
		first: ["It'll be more fun\nbecause it's different!"],
		second: ["You're not offended\nare you?"],
		third: ["Isn't it family, not friends?"]
	},
	couple: {
		first: ["Your difference must have\ncome to each other as a charm!"],
		second: ["You two look so good together!"],
		third: ["It's a match made in heaven"]
	}
	
}
export const Sentence = {
	ad: ["창조는 고민 속에서 나오고\n발전은 고생 속에서 움튼다.\n-밝은 사회-",
	"사람은 고생을 면할 수가 없다\n그러나 잊을 수 있는 능력이 있다. \n-디즈레일리-",
	"은혜를 입은 자는 잊지 말아야 하고\n베푼 자는 기억하지 말아야 한다. \n-페래 찰론-",
	"내일의 모든 꽃은\n오늘의 씨앗에 근거한 것이다. \n-중국속담-",
	"죄는 취소될 수 없다.\n용서될 뿐이다. \n-스트라빈스키-",
	"가치 있는 적이 될 수 있는 자는\n화해하면 더 가치 있는 친구가 될 것이다. \n-펠담-",
	"원인은 숨겨지지만\n결과는 잘 가려진다. \n-오비딩스-",
	"기회는 새와 같은 것,\n날아가기 전에 꼭 잡아라. \n-스마일즈-",
	"한 가지 일을 경험하지 않으면\n한 가지 지혜가 자라지 않는다. \n-명심보감-",
	"빈곤은 재앙이 아니라 불편이다. \n-플로리오-",
	"모든 일은 계획으로 시작하고,\n노력으로 성취되며,\n오만으로 망친다. \n-관자-",
	"시종일관하는 자는 운명을 믿고,\n변덕 부리는 자는 요행을 믿는다. \n-디즈레일리-",
	"말이 입힌 상처는\n칼이 입힌 상처보다 깊다. \n-모르코 속담-",
	"무지함을 두려워 말라.\n거짓 지식을 두려워하라. \n-파스칼-",
	"선을 행하는 데는\n나중이라는 말이 필요 없다. \n-괴테-",
	"학문의 최대의 적은\n자기 마음속에 있는 유혹이다. \n-처칠-",
	"지식과 목재는\n세파에 시달리지 아니하면\n많이 애용될 수가 없다. \n-올리버 웬델 홈즈-",
	"행동을 초래시키지 않는 생각,\n그것은 생각이 아니라 공상이다. \n-에리자 램브 마틴-",
	"기쁨을 주는 사람만이\n더 많은 기쁨을 즐길 수 있다. \n-알렉산더 듀마-",
	"작은 구멍 하나가\n큰 배를 침몰시키는 것이다. \n-에프라임 도마라츠키-",
	"목표를 보는 자는\n장애물을 겁내지 않는다. \n-한나 모어-",
	"산을 옮기는 사람은\n작은 돌멩이 부터 옮긴다. \n-중국 속담-",
	"험담은 세 사람을 죽인다.\n말하는 자, 험담의 대상자, 듣는 자 \n-미드라쉬-",
	"인내하라, 경험하라, 조심하라.\n그리고 희망을 가져라. \n-조셉 에디슨-",
	"사람의 척도는\n그가 불행을 얼마나\n잘 이겨내는지에 달려있다. \n-프르다크-",
	"돈으로 살 수 있는\n행복이라 불리는 상품은 없다. \n-헨리 밴 다이-",
	"일은 인류를 사로잡는\n모든 질환과 비참을 치료해 주는\n주요한 치료제이다. \n-칼라일-",
	"힘으로서 사람을 복종시키지 말고\n덕으로서 사람을 복종시켜라. \n-맹자-",
	"용기는 대단히 중요하다.\n근육과 같이 사용함으로써 강해진다. \n-고든-",
	"패배를 극복하는 법을 배워야 한다.\n그럴 때에 당신의 인격이 향상된다. \n-닉슨-",
	"아예 배우지 않느니 보다는\n늦으나마 배우는 편이 낫다. \n-클레오 불루수-",
	"행동에 부주의하지 말며,\n말에 혼동되지 말려,\n생각에 방황하지 말라. \n-마르크스 아우렐리우스-",
	"험한 언덕을 오르려면\n처음에는 서서히 걸어야 한다. \n-세익스피어-",
	"쓴 맛을 보기 전에\n단 맛을 보아서는 안된다. \n-고울딤 헴-",
	"사자라 할지라도\n파리들로 부터 자기 몸을 방어해야 한다. \n-독일격언-",
	"뿌리가 튼튼해야 열매가 많다. \n-용비어천가-",
	"화가 나면 열을 세어라.\n풀리지 않는 다면 백을 세어라. \n-제퍼슨-",
],	front: [
	"“Love is not affectionate feeling, but a steady wish for the loved person’s ultimate good as far as it can be obtained”",
	"“Affection is responsible for nine-tenths of whatever solid and durable happiness there is in our lives”",
	"“Friendship is born at that moment when one person says to another: “What! You too? I thought I was the only one.”",
	"“What draws people to be friends is that they see the same truth. They share it.”",
	" “It is when we notice the dirt that God is most present in us; it is the very sign of His presence.”",
	"“The Christian does not think God will love us because we are good, but that God will make us good because He loves us.”",
	"“Though our feelings come and go, God’s love for us does not.”",
	"“To enter heaven is to become more human than you ever succeeded in being on earth; to enter hell, is to be banished from humanity.”",
	"“You don’t have a soul. You are a soul. You have a body.”",
	"“You can never get a cup of tea large enough or a book long enough to suit me.”",
	"“I believe in Christianity as I believe that the sun has risen: not only because I see it, but because by it I see everything else.”",
	"“Some day you will be old enough to start reading fairy tales again.”",
	"“A children’s story that can only be enjoyed by children is not a good children’s story in the slightest.”",
	"“If we find ourselves with a desire that nothing in this world can satisfy, the most probable explanation is that we were made for another world.”",
	"“The Christian does not think God will love us because we are good, but that God will make us good because He loves us.”",
	"“I can’t imagine a man really enjoying a book and reading it only once.”",
	"“Eating and reading are two pleasures that combine admirably.”",
	"“To be a Christian means to forgive the inexcusable because God has forgiven the inexcusable in you.”",
	"“Love is not affectionate feeling, but a steady wish for the loved person’s ultimate good as far as it can be obtained.”",
	"“There are far, far better things ahead than any we leave behind.”",
	"“God can’t give us peace and happiness apart from Himself because there is no such thing.”",
	"“He died not for men, but for each man. If each man had been the only man made, He would have done no less.”",
	"“You never know how much you really believe anything until its truth or falsehood becomes a matter of life and death to you.”",
	"“Nothing that you have not given away will ever be really yours.”",
	"“No man knows how bad he is till he has tried very hard to be good.”",
	"“Don’t let your happiness depend on something you may lose.”",
	"“The heart never takes the place of the head: but it can, and should, obey it.”",
	"“We laugh at honor and are shocked to find traitors in our midst.”",
	"“We are what we believe we are.”",
	"“Each day we are becoming a creature of splendid glory or one of unthinkable horror.”",
	"“Always prefer the plain direct word to the long, vague one. Don’t implement promises, but keep them.”",
	" “Isn’t it funny how day by day nothing changes, but when you look back, everything is different…”",
	"“Experience: that most brutal of teachers. But you learn, my God do you learn.",
	"“You are never too old to set another goal or to dream a new dream.”",
	"“We are mirrors whose brightness is wholly derived from the sun that shines upon us.",
	"“There is but one good; that is God. Everything else is good when it looks to Him and bad when it turns from Him.”",
	"“Joy is the serious business of Heaven.”",
	"“God intends to give us what we need, not what we now think we want.”",
	"“Do not waste time bothering whether you ‘love’ your neighbour; act as if you do, and you will presently come to love him.”",
	"“True humility is not thinking less of yourself; it is thinking of yourself less.”",
	"“Do not let us mistake necessary evils for good.”",
	"“No one ever told me that grief felt so like fear.”",
	"“The truth is, of course, that what one regards as interruptions are precisely one’s life.”",
	"“I sometimes wonder if all pleasures are not substitutes for joy.”",
	"“To love at all is to be vulnerable”",
	"“All get what they want; they do not always like it.”",
	"“Thirst was made for water; inquiry for truth.”",
	"“The sun looks down on nothing half so good as a household laughing together over a meal.”",
	"“You may forget that you are at every moment totally dependent on God.”",
	"“It is safe to tell the pure in heart that they shall see God, for only the pure in heart want to.”",
	"“Failures are finger posts on the road to achievement.”",
	"“No great wisdom can be reached without sacrifice.”",
	"“Remember that all worlds draw to an end and that noble death is a treasure which no one is too poor to buy.”",
	"“If you do one good deed your reward usually is to be set to do another and harder and better one.”",
	"“One of the most cowardly things ordinary people do is to shut their eyes to facts.”",
	"“It is not your business to succeed but to do right. When you have done so the rest lies with God.”",
	"“Miracles do not, in fact, break the laws of nature.”",
	"“There is no other day. All days are present now. This moment contains all moments.”",
	"“Love is something more stern and splendid than mere kindness.”",
	"“When we lose one blessing, another is often most unexpectedly given in its place.”",
	"“If you love deeply, you’re going to get hurt badly. But it’s still worth it.”",
	"“Spiteful words can hurt your feelings but silence breaks your heart.”",
	"“People who bore one another should meet seldom; people who interest one another, often.”",
	"“One always feels better when one has made up one’s mind.”",
]
}