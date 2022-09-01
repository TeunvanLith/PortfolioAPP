<script>
  export let text = "Undef"
  export let theme;

</script>
<div class="circle-wrap">
    <div class="circle">
      <div class="mask full">
          <div class="fill" style="background-color: {theme}"></div>
      </div>
      <div class="mask half">
          <div class="fill" style="background-color: {theme}"></div>
       </div>
       <div class="inside-circle">{text}</div>
    </div>
</div>
<style>
    .circle-wrap {
  margin: 10px auto;
  width: 100px;
  height: 100px;
  background: #fefcff;
  border-radius: 50%;
}

.circle-wrap .circle .mask,
.circle-wrap .circle .fill {
  width: 100px;
  height: 100px;
  position: absolute;
  border-radius: 50%;
}

.mask .fill {
  clip: rect(0px, 50px, 100px, 0px);
}
.circle-wrap .circle .mask {
  clip: rect(0px, 100px, 100px, 50px);
}

.mask.full,
.circle .fill {
  animation: fill ease-in-out 4s;
  transform: rotate(108deg);
}

@keyframes fill{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(108deg);
  }
}

.circle-wrap .inside-circle {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #232323;
  line-height: 75px;
  text-align: center;
  margin-top: 12px;
  margin-left: 12px;
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 1em;
}

</style>