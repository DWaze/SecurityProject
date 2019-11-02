function enigmaEncryption(
  letter,
  keysettings,
  ringsettings,
  rotorsettings,
  plugboardsettings
) {
  if (letter.length < 1) {
    console.log("no letter entered");
    return null;
  }
  if (keysettings.length !== 3) {
    console.log("Key settings must consist of 3 uppercase characters.");
    return;
  }
  if (ringsettings.length !== 3) {
    console.log("Ring settings must consist of 3 uppercase characters.");
    return null;
  }
  if (plugboardsettings.length > 26) {
    console.log(
      "There cannot be more than 13 pairs in the plugboard settings."
    );
    return null;
  }
  if (plugboardsettings.length % 2 !== 0) {
    console.log(
      "There must be an even number of characters in the plugboard settings."
    );
    return null;
  }
  if (rotorsettings.length !== 3) {
    console.log("Rotor settings must consist of 3 numbers 1-9.");
    return null;
  }

  var rotors = rotorsettings.split("");
  rotors[0] = rotors[0].valueOf() - 1;
  rotors[1] = rotors[1].valueOf() - 1;
  rotors[2] = rotors[2].valueOf() - 1;

  var plugboard = setupPlugBoard(plugboardsettings);
  var key = null;
  var ring = null;
  // the keys are the rotors position in our case we have three rotors then we need three keys for each rotor
  if (typeof keysettings == "string" && typeof ringsettings == "string") {
    key = keysettings.split("");
    key[0] = code(key[0]);
    key[1] = code(key[1]);
    key[2] = code(key[2]);

    ring = ringsettings.split("");
    ring[0] = code(ring[0]);
    ring[1] = code(ring[1]);
    ring[2] = code(ring[2]);
  } else {
    key = keysettings;
    ring = ringsettings;
  }

  var cypher_letter = "";
  var ch_letter = letter.charAt(0);

  // if the current character is not a letter, pass it through unchanged
  if (!ch_letter.match(/[A-Z]/)) {
    cypher_letter = cypher_letter + " ";
  } else {
    key = increment_rotors(key, rotors);
    cypher_letter =
      cypher_letter + enigmaCypher(ch_letter, key, rotors, ring, plugboard);
  }
  console.log("cyphered letter=" + cypher_letter);
  return [cypher_letter, key, ring];
}

function enigmaCypher(ch_letter, key, rotors, ring, plugboard) {
  // the first substitution is the applaying the plugboard transformation
  ch_letter = simplesub(ch_letter, plugboard);

  // here we apply the rotors transformations
  ch_letter = rotor(ch_letter, rotors[2], key[2] - ring[2]);
  ch_letter = rotor(ch_letter, rotors[1], key[1] - ring[1]);
  ch_letter = rotor(ch_letter, rotors[0], key[0] - ring[0]);

  // the second substitution is to use the reflector
  ch_letter = simplesub(ch_letter, "YRUHQSLDPXNGOKMIEBFZCWVJAT"); // todo change the key

  ch_letter = rotor(ch_letter, rotors[0] + 8, key[0] - ring[0]);
  ch_letter = rotor(ch_letter, rotors[1] + 8, key[1] - ring[1]);
  ch_letter = rotor(ch_letter, rotors[2] + 8, key[2] - ring[2]);

  // re-applying the plugboard substitution
  ch_letter = simplesub(ch_letter, plugboard);
  return ch_letter;
}

// eslint-disable-next-line no-unused-vars
function increment_rotors(key, r) {
  var notch = [
    [16, 16],
    [4, 4],
    [21, 21],
    [9, 9],
    [25, 25],
    [25, 12],
    [25, 12],
    [25, 12]
  ];
  if (key[1] === notch[r[1]][0] || key[1] === notch[r[1]][1]) {
    key[0] = (key[0] + 1) % 26;
    key[1] = (key[1] + 1) % 26;
  }
  if (key[2] === notch[r[2]][0] || key[2] === notch[r[2]][1]) {
    key[1] = (key[1] + 1) % 26;
  }
  key[2] = (key[2] + 1) % 26;
  return key;
}

function simplesub(ch_letter, key) {
  return key.charAt(code(ch_letter));
}

function rotor(ch_letter, rotor, offset) {
  var key = [
    "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    "ESOVPZJAYQUIRHXLNFTGKDCMWB",
    "VZBRGITYUPSDNHLXAWMJQOFECK",
    "JPGVOUMFYQBENHZRDKASXLICTW",
    "NZJHGRCXMYSWBOUFAIVLPEKQDT",
    "FKQHTLXOCBJSPDZRAMEWNIUYGV",
    // inverses
    "UWYGADFPVZBECKMTHXSLRINQOJ",
    "AJPCZWRLFBDKOTYUQGENHXMIVS",
    "TAGBPCSDQEUFVNZHYIXJWLRKOM",
    "HZWVARTNLGUPXQCEJMBSKDYOIF",
    "QCYLXWENFTZOSMVJUDKGIARPHB",
    "SKXQLHCNWARVGMEBJPTYFDZUIO",
    "QMGYVPEDRCWTIANUXFKZOSLHJB",
    "QJINSAYDVKBFRUHMCPLEWZTGXO"
  ];

  var chcode = (code(ch_letter) + 26 + offset) % 26;
  var mapch = ((code(key[rotor].charAt(chcode)) + 26 - offset) % 26) + 65;
  return String.fromCharCode(mapch);
}

function setupPlugBoard(setupKeys) {
  var plug_board = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var alphabet = plug_board.split("");
  var i;
  setupKeys = setupKeys.split("");
  for (i = 0; i < setupKeys.length; i = i + 2) {
    [
      alphabet[alphabet.indexOf(setupKeys[i])],
      alphabet[alphabet.indexOf(setupKeys[i + 1])]
    ] = [setupKeys[i + 1], setupKeys[i]];
  }
  return alphabet.join("");
}

function code(ch) {
  return ch.toUpperCase().charCodeAt(0) - 65;
}

export { enigmaEncryption };
