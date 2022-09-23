<template>
    <div class="container">
        <img class="image"
            src="../assets/austin-neill-uHD0uyp79Dg-unsplash4.jpg"
            alt="Surf Photo"
        />
        <div class="text-block">
            <h6>Welcome!</h6>
            <p>The days of carrying heavy surfbags and gears through airports is over.
                Find all the stores, boards, gears and lessons on your next surftrip to keep the stoke!
            </p>
        </div>
    </div>
</template>

<script>
export default { name: 'banner' }
</script>

<style scoped>
.container {
  position:relative;
  padding-left: 1px;
  padding-top: 1px;
}
.image {
    width: 1150px;
    background-size: cover;
    object-fit:scale-down;
}

.text-block {
  position: absolute;
  bottom: 20px;
  left: 60px;
  right: 900px;
  font-size: x-small;
  background-color: rgba(0, 0, 0, 0.478);
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
}
</style>
