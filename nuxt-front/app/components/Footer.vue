<template>
    <div class="footerContainer">
        <RouterLink to="/MentionLegal" class="footerLink"
            >Mention Légal</RouterLink
        >
        <div class="divider"></div>
        <RouterLink to="/CGU" class="footerLink">CGU</RouterLink>
    </div>
</template>

<style>
.footerContainer {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    font-family: Cizel;
    font-weight: bold;
    font-size: 24px;
    background-color: #303030;
    height: 100px;
    border-top: #FFFFFF 2px solid;
}

.footerLink {
    color: white;
    text-decoration: none;
}

.divider {
    width: 2px;
    height: 50%; /* tu peux ajuster la hauteur */
    background-color: white;
    margin: 0 auto;
}
</style>
