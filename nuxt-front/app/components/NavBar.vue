<template>
    <div class="navBar">
        <NuxtLink to="/" class="iconContainer">
            <Icon name="my-icon:frame" size="3rem" />
            <h1>
                Projet <br />
                Griffon
            </h1>
        </NuxtLink>
        <NuxtLink to="/connexion" class="iconContainer">
            <Icon name="my-icon:logo-account" size="4rem" />
        </NuxtLink>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.navBar {
    background-color: #303030;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: #ffffff 1px solid;
}

.iconContainer {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 23px;
    padding: 30px 35px 30px 35px;
    font-family: Cinzel;
}
</style>
