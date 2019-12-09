const badWords = '|4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assf' +
    'ukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|balls' +
    'ack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi+ch|biatch|bitch|b' +
    'itcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiola' +
    's|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buc' +
    'eta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carp' +
    'et muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockfa' +
    'ce|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucki' +
    'ng|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer' +
    '|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicke' +
    'r|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfucke' +
    'rs|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-f' +
    'ucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculat' +
    'es|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|' +
    'fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fany' +
    'y|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fi' +
    'ngerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfuc' +
    'ked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker' +
    '|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuc' +
    'kingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|' +
    'fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|ga' +
    'ngbangs|gaylord|gaysex|goatse|god-dam|god-damned|goddamn|goddamned|hardcoresex|h' +
    'ell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|j' +
    'erk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|k' +
    'nobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i+ch|l3itch|la' +
    'bia|lmfao|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master' +
    '-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|mastu' +
    'rbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|m' +
    'othafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother' +
    ' fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfu' +
    'cking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckke' +
    'r|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz' +
    '|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim' +
    '|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|' +
    'phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|p' +
    'issers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|porno' +
    's|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|r' +
    'imming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!+' +
    '|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi+|shit|shitdick|shite|shited' +
    '|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitte' +
    'rs|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|' +
    'spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits' +
    '|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|' +
    'twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|w' +
    'ank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx|bollocks|child-fucker|Chri' +
    'st on a bike|Christ on a cracker|swear word|godsdamn|holy shit|' +
    'Jesus H. Christ|Jesus Harold Christ|Jesus wept|Judas ' +
    'Priest|shit ass|shitass|son of a bitch|son of a motherless goat|son of a whore|s' +
    'weet Jesus|2g1c|2 girls 1 cup|acrotomophilia|alabama hot pocket|alaskan pipeline' +
    '|anilingus|apeshit|arsehole|assmunch|auto erotic|autoerotic|babeland|baby batter' +
    '|baby juice|ball gag|ball gravy|ball kicking|ball licking|ball sack|ball sucking' +
    '|bangbros|bareback|barely legal|barenaked|bastardo|bastinado|bbw|bdsm|beaner|bea' +
    'ners|beaver cleaver|beaver lips|big black|big breasts|big knockers|big tits|bimb' +
    'os|birdlock|black cock|blonde action|blonde on blonde action|blow your load|blue' +
    ' waffle|blumpkin|bondage|booty call|brown showers|brunette action|bukkake|bulldy' +
    'ke|bullet vibe|bullshit|bung hole|bunghole|busty|buttcheeks|camel toe|camgirl|ca' +
    'mslut|camwhore|carpetmuncher|chocolate rosebuds|circlejerk|cleveland steamer|clo' +
    'ver clamps|clusterfuck|coprolagnia|coprophilia|cornhole|coons|creampie|darkie|da' +
    'te rape|daterape|deep throat|deepthroat|dendrophilia|dingleberry|dingleberries|d' +
    'irty pillows|dirty sanchez|doggie style|doggiestyle|doggy style|doggystyle|dog s' +
    'tyle|dolcett|domination|dominatrix|dommes|donkey punch|double dong|double penetr' +
    'ation|dp action|dry hump|dvda|eat my ass|ecchi|erotic|erotism|escort|eunuch|feca' +
    'l|felch|feltch|female squirting|femdom|figging|fingerbang|fingering|fisting|foot' +
    ' fetish|footjob|frotting|fuck buttons|fucktards|futanari|gang bang|gay sex|genit' +
    'als|giant cock|girl on|girl on top|girls gone wild|goatcx|god damn|gokkun|golden' +
    ' shower|goodpoop|goo girl|goregasm|grope|group sex|g-spot|guro|hand job|handjob|' +
    'hard core|hardcore|hentai|homoerotic|honkey|hooker|hot carl|hot chick|how to kil' +
    'l|how to murder|huge fat|humping|incest|intercourse|jack off|jail bait|jailbait|' +
    'jelly donut|jerk off|jigaboo|jiggaboo|jiggerboo|juggs|kike|kinbaku|kinkster|kink' +
    'y|knobbing|leather restraint|leather straight jacket|lemon party|lolita|lovemaki' +
    'ng|make me come|male squirting|menage a trois|milf|missionary position|mound of ' +
    'venus|mr hands|muff diver|muffdiving|nambla|nawashi|negro|neonazi|nig nog|nimpho' +
    'mania|nipple|nipples|nsfw images|nude|nudity|nympho|nymphomania|octopussy|omoras' +
    'hi|one cup two girls|one guy one jar|orgy|paedophile|paki|panties|panty|pedobear' +
    '|pedophile|pegging|phone sex|piece of shit|piss pig|pisspig|playboy|pleasure che' +
    'st|pole smoker|ponyplay|poof|poon|poontang|punany|poop chute|poopchute|prince al' +
    'bert piercing|pthc|pubes|queaf|queef|quim|raghead|raging boner|rape|raping|rapis' +
    't|reverse cowgirl|rimjob|rosy palm|rosy palm and her 5 sisters|rusty trombone|sa' +
    'dism|santorum|scat|scissoring|sexo|sexy|shaved beaver|shaved pussy|shibari|shitb' +
    'limp|shota|shrimping|skeet|slanteye|s&m|snowballing|sodomize|sodomy|spic|splooge' +
    '|splooge moose|spooge|spread legs|strap on|strapon|strappado|strip club|style do' +
    'ggy|suck|sucks|suicide girls|sultry women|swastika|swinger|tainted love|taste my' +
    '|tea bagging|threesome|throating|tied up|tight white|titty|tongue in a|topless|t' +
    'owelhead|tranny|tribadism|tub girl|tubgirl|tushy|twink|twinkie|two girls one cup' +
    '|undressing|upskirt|urethra play|urophilia|venus mound|vibrator|violet wand|vora' +
    'rephilia|voyeur|wetback|wet dream|white power|wrapping men|wrinkled starfish|xx|' +
    'yaoi|yellow showers|yiffy|zoophilia|a54|buttmunch|donkeypunch|fleshflute|asswipe' +
    '|bitchass|moo moo foo foo|trumped|assbag|assbandit|assbanger|assbite|assclown' +
    '|asscock|asscracker|assface|assfuck|assgoblin|asshat|ass-hat|asshead|asshopper|a' +
    'ss-jabber|assjacker|asslick|asslicker|assmonkey|assmuncher|assnigger|asspirate|a' +
    'ss-pirate|assshit|assshole|asssucker|asswad|axwound|bampot|bitchtits|bitchy|boll' +
    'ox|brotherfucker|bumblefuck|butt plug|buttfucka|butt-pirate|buttfucker|chesticle' +
    '|chinc|choad|chode|clitface|clitfuck|cockass|cockbite|cockburger|cockfucker|cock' +
    'jockey|cockknoker|cockmaster|cockmongler|cockmongruel|cockmonkey|cocknose|cocknu' +
    'gget|cockshit|cocksmith|cocksmoke|cocksmoker|cocksniffer|cockwaffle|coochie|cooc' +
    'hy|cooter|cracker|cumbubble|cumdumpster|cumguzzler|cumjockey|cumslut|cumtart|cun' +
    'nie|cuntass|cuntface|cunthole|cuntrag|cuntslut|dago|deggo|dickbag|dickbeaters|di' +
    'ckface|dickfuck|dickfucker|dickhole|dickjuice|dickmilk|dickmonger|dicks|dicksla' +
    'p|dick-sneeze|dicksucker|dicksucking|dicktickler|dickwad|dickweasel|dickweed|dic' +
    'kwod|dike|dipshit|doochbag|dookie|douche|douchebag|douche-fag|douchewaffle|dumas' +
    's|dumb ass|dumbass|dumbfuck|dumbshit|dumshit|fagbag|fagfucker|faggit|faggotcock|' +
    'fagtard|flamer|fuckass|fuckbag|fuckboy|fuckbrain|fuckbutt|fuckbutter|fuckersucke' +
    'r|fuckface|fuckhole|fucknut|fucknutt|fuckoff|fuckstick|fucktard|fucktart|fuckup|' +
    'fuckwad|fuckwitt|gay|gayass|gaybob|gaydo|gayfuck|gayfuckist|gaytard|gaywad|godda' +
    'mnit|gooch|gook|gringo|guido|hard on|heeb|hoe|homodumbshit|jackass|jagoff|jerkas' +
    's|jungle bunny|junglebunny|kooch|kootch|kraut|kunt|kyke|lameass|lardass|lesbian|' +
    'lesbo|lezzie|mcfagget|mick|minge|muffdiver|munging|nigaboo|niglet|nut sack|panoo' +
    'ch|peckerhead|penisbanger|penispuffer|pissed off|polesmoker|pollock|poonani|poon' +
    'any|porch monkey|porchmonkey|punanny|pussylicking|puto|puta|queer|queerbait|que' +
    'erhole|renob|ruski|sand nigger|sandnigger|shitbag|shitbagger|shitbrains|shitbrea' +
    'th|shitcanned|shitcunt|shitface|shitfaced|shithole|shithouse|shitspitter|shitsta' +
    'in|shittiest|shiz|shiznit|skullfuck|slutbag|smeg|spick|spook|suckass|tard|thunde' +
    'rcunt|twatlips|twats|twatwaffle|unclefucker|vag|vajayjay|va-j-j|vjayjay|wankjob|' +
    'whorebag|whoreface|wop|fuck you|piss off|dick head|bloody hell|crikey|rubbish|ta' +
    'king the piss|jerk|knob end|lmao|wtf|bint|ginger|minger|munter|sod off|c' +
    'hinky|choc ice|gippo|golliwog|hun|iap|jock|nig-nog|pikey|polack|sambo|slope|spad' +
    'e|taff|wog|beaver|beef curtains|bloodclaat|clunge|flaps|gash|punani|batty boy|be' +
    'nder|bum boy|bumclat|bummer|chi-chi man|chick with a dick|fudge-packer|gender be' +
    'nder|he-she|lezza/lesbo|pansy|shirt lifter|cretin|cripple|div|looney|midget|mong' +
    '|nutter|psycho|schizo|veqtable|window licker|fenian|kafir|prod|taig|yid|iberian ' +
    'slap|middle finger|two fingers with tongue|two fingers|nonce|prickteaser|rapey|s' +
    'lag|tart|coffin dodger|old bag|frenchify|bescumber|microphallus|coccydynia|ninny' +
    'hammer|buncombe|hircismus|corpulent|feist|fice|cacafuego|ass fuck|assfaces|as' +
    'smucus|bang (one\'s) box|bastards|beef curtain|bitch tit|blow me|' +
    'blow mud|blue waffle|blumpkin|bust a load|butt fuck|choade|cho' +
    'ta bags|clit licker|clitty litter|cock pocket|cock snot|cocksuck ' +
    '|cocksucked|cocksuckers|cocksucks|cop some wood|cornhole|corp whore|c' +
    'um chugger|cum dumpster|cum freak|cum guzzler|cumdump|cunt hair' +
    '|cuntbag|cuntlick|cuntlicker|cuntlicking|cuntsicle|cunt-struck|cut ' +
    'rope|cyberfuck|cyberfucked|cyberfucking|dick hole|dick shy|dickheads' +
    '|dirty Sanchez|eat a dick|eat hair pie|ejaculates|ejaculating|facial' +
    '|faggots|fingerfuck|fingerfucked|fingerfucker|fingerfucking|fingerfucks|f' +
    'ist fuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fist' +
    'fucks|flog the log|fuc|fuck hole|fuck puppet|fuck trophy|fuck yo ma' +
    'ma|fuck���|fuck-ass���|fuck-bitch���|fuckedup|fuckme|fuckmeat���|fucktoy���|' +
    'fukkers|fuq|gang-bang���|gassy ass���|ham flap���|how to murdep|jackasses|ji' +
    'z|jizm|kinky Jesus���|kwif���|LEN|mafugly���|mothafucked|mothafucking|mother' +
    ' fucker���|muff puff���|need the dick���|nut butter���|pisses|pissin|pissoff|' +
    'pussy fart���|pussy palace���|queaf���|sandbar���|sausage queen���|shit fucker��' +
    '�|shitheads|shitters|shittier|slope���|slut bucket���|smartass|smartasses|tit w' +
    'ank���|tities|wiseass|wiseasses|boong|coonnass|darn|Breeder|Cocklump|Doublelift|' +
    'Dumbcunt|Fuck off|Poopuncher|Sandler|cockeye|crotte|cus|foah|fucktwat|jaggi|kunj' +
    'a|pust|sanger|seks|zubb|zibbi|';

const _dwords = badWords.split('|')
  .sort((a, b) => a.length - b.length)
  .filter((w, i) => {
    return (/\s/g).test(w);
  });
const _dwordsL = _dwords.length;
const hasBadWords = ( text: string ) => {
  let _words = text.toLowerCase().split(' ');
  // Verificando si existe las palabras en la cadena
  let k = _words.findIndex(
      ( _word ) => {
        // takes out special caracters
        _word = _word.replace(/\W/gi, '');
        let testR = RegExp('\\|' + _word + '\\|', 'gi');
        return testR.test(badWords);
      }
    );
  if ( k !== -1 ) {
    return true;
  }
  // Verificando ahora con frases compuestas o textos separados por espacios
  // Optimizando para no buscar en todos los registro aun cuando el texto
  // es menor a lo establecido
  k = -1;
  let tl = text.length;
  for (let i = 0; i < _dwordsL; i++) {
    if ((/^\s*$/).test(_dwords[i])) {
      continue;
    }
    if (tl < _dwords[i].length) {
      break;
    }
    let testR = RegExp(_dwords[i], 'gi');
    if ( testR.test(text) ) {
      k = i;
      break;
    }
  }

  return (k !== -1);
};

export default hasBadWords;
