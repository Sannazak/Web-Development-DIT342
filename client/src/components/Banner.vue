<template>
    <div class="container">
        <img class="image"
            src="../assets/banner_photo.jpg"
            alt="Surf Photo"
        />
        <div class="text-block">
            <h6>Welcome!</h6>
            <p>The days of carrying heavy surfbags and gears through airports is over.
                Find all the stores, boards, gears and lessons on your next surftrip and keep the stoke!
            </p>
        </div>
        <form action="https://www.google.com" method="get" class="search-bar">
            <input type="text" placeholder="Search for location or shop" name="q">
            <button type="submit"><img src="../assets/banner_photo.jpg"></button>
        </form>
    </div>
</template>

<script>
export default { name: 'banner' }
</script>

<style scoped>
.container {
  position: relative;
  padding-left: 1px;
  padding-top: 1px;
  display: flex;
  align-items: right;
  justify-content: right;
}
.search-bar{
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.2);
    display:flex;
    align-items: right;
    position:absolute;
    border-radius: 60px;
    padding: 5px 10px;
    backdrop-filter: blur(1px);
}

.search-bar input{
    background: transparent;
    flex: 1;
    border: 0;
    outline: none;
    padding: 24px 20px;
    font-size: 15px;
    color: #056158;
}

::placeholder{
    color:#056158;
}

.search-bar button img{
    width:15px;
}

.search-bar button{
    border: 0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background: #054e47;
    cursor: pointer;
}
.image {
    width: 100%;
    background-size: cover;
    object-fit:scale-down;
    min-height: 100%;
    bottom: 0%;
}

.text-block {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 1000px;
  font-size: normal;
  background-color: rgba(0, 0, 0, 0.478);
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  width: 20%;
  height: 90%;
}
</style>
