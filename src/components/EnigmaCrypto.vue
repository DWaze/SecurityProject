<template>
  <div id="app">
    <img id="enigmaLogo" src="../assets/enigma.png" alt="" />
    <div id="form">
      <label><b>Rotors</b></label>
      <b-form inline>
        <b-form-select
          class="mb-1 m-auto"
          v-model="form.rotor1"
          :options="rotorsSelection"
          id="inline-form-custom-select-pref"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>
        <b-form-select
          class="mb-1 m-auto"
          v-model="form.rotor2"
          :options="rotorsSelection"
          id="inline-form-custom-select-pref"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>
        <b-form-select
          class="mb-1 m-auto"
          v-model="form.rotor3"
          :options="rotorsSelection"
          id="inline-form-custom-select-pref"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>
      </b-form>
      <br />
      <label><b>Keys</b></label>
      <b-form inline>
        <b-form-select
          class="mb-1 m-auto"
          v-model="form.key1"
          :options="keysSelection"
          id="inline-form-custom-select-pref"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>
        <b-form-select
          class="mb-1 m-auto"
          v-model="form.key2"
          :options="keysSelection"
          id="inline-form-custom-select-pref"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>
        <b-form-select
          class="mb-1 m-auto"
          v-model="form.key3"
          :options="keysSelection"
          id="inline-form-custom-select-pref"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>
      </b-form>
    </div>
    <br />
    <div>
      <textarea
        :value="input"
        class="input"
        @input="onInputChange"
        placeholder="Texte Chiffré"
        maxlength="200"
      ></textarea>
    </div>
    <br />
    <div>
      <div>
        <SimpleKeyboard
          @onChange="onChange"
          @onKeyPress="onKeyPress"
          :input="input"
        />
        <br />

        <b-form-input
          id="input-1"
          v-model="plugboard"
          required
          placeholder="Enter plugboard configuration"
        ></b-form-input>
        <br />
        <b-button variant="danger" @click="resetView">Reset</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleKeyboard from "./SimpleKeyboard";
import "../assets/App.css";
import { enigmaEncryption } from "../methods/Enigma";

export default {
  name: "HelloWorld",
  components: {
    SimpleKeyboard
  },
  data: () => ({
    input: "",
    theme: "hg-theme-default myTheme1",
    letter: "A",
    key_setting: null,
    ring_setting: [0, 0, 0],
    rotors: "123",
    plugboard: "POMLIUKJNHYTGBVFREDC",
    encryptedResult: [],
    rotorsSelection: "1234567".split(""),
    keysSelection: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25".split(
      ","
    ),
    form: {
      rotor1: null,
      rotor2: null,
      rotor3: null,
      key1: null,
      key2: null,
      key3: null
    },
    show: true
  }),
  methods: {
    enigmaEncryption,
    onChange(input) {
      console.log(input);
      if (this.encryptedResult) {
        this.input = this.input + this.encryptedResult[0];
      }
    },
    onKeyPress(button) {
      this.letter = button;
      this.rotors = this.form.rotor1 + this.form.rotor2 + this.form.rotor3;
      this.key_setting = [
        parseInt(this.form.key1),
        parseInt(this.form.key2),
        parseInt(this.form.key3)
      ];

      if (
        !this.plugboard.split("").some(function(v, i, a) {
          return a.lastIndexOf(v) != i;
        })
      ) {
        console.log("keySetting________ " + this.key_setting);
        this.encryptedResult = this.enigmaEncryption(
          this.letter,
          this.key_setting,
          this.ring_setting,
          this.rotors,
          this.plugboard
        );
        if (this.encryptedResult) {
          this.key_setting = this.encryptedResult[1];
          this.form.key1 = this.key_setting[0];
          this.form.key2 = this.key_setting[1];
          this.form.key3 = this.key_setting[2];
          this.ring_setting = this.encryptedResult[2];
          console.log(this.encryptedResult[0]);
        }
      } else {
        this.encryptedResult = null;
      }
    },
    onInputChange(input) {
      console.log(input);
      this.input = input.target.value;
    },
    resetView() {
      this.input = "";
      this.form.key1 = null;
      this.form.key2 = null;
      this.form.key3 = null;
      this.form.rotor1 = null;
      this.form.rotor2 = null;
      this.form.rotor3 = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-bottom: 50px;
}
#enigmaLogo {
  height: 90px;
  width: auto;
  margin-bottom: 20px;
}
</style>
