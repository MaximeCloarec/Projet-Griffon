<template>
    <UNavigationMenu
        color="primary"
        :items="items"
        class="w-full justify-center"
    />

        <div class="p-8">
            <UButton color="primary" size="xl">Mon bouton</UButton>
        </div>

</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
    {
        label: "Accueil",
        to: "/",
    },
    {
        label: "Connexion",
        to: "Connexion",
    },
]);
</script>
