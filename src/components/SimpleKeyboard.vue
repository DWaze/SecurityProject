<template>
  <div class="keyboardContainer">
    <div class="simple-keyboard-main"></div>

    <div class="controlArrows">
      <div class="simple-keyboard-control"></div>
      <div class="simple-keyboard-arrows"></div>
    </div>

    <div class="numPad">
      <div class="simple-keyboard-numpad"></div>
      <div class="simple-keyboard-numpadEnd"></div>
    </div>
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
export default {
  name: "SimpleKeyboard",
  props: {
    input: String
  },
  data: () => ({
    keyboard: null,
    keyboardControlPad: null,
    keyboardArrows: null,
    keyboardNumPad: null,
    keyboardNumPadEnd: null
  }),
  mounted() {
    let commonKeyboardOptions = {
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      mergeDisplay: true,
      debug: true
    };
    this.keyboard = new Keyboard(".simple-keyboard-main", {
      ...commonKeyboardOptions,
      /**
       * Layout by:
       * Sterling Butters (https://github.com/SterlingButters)
       */
      layout: {
        default: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "Z X C V B N M",
          "{space}"
        ]
      }
    });
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (
        button === "{shift}" ||
        button === "{shiftleft}" ||
        button === "{shiftright}" ||
        button === "{capslock}"
      )
        this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
