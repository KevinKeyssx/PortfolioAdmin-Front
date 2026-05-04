<script lang="ts">
    import Sidebar from '../components/Sidebar.svelte';
    import MainContent from '../components/MainContent.svelte';
</script>

<div class="flex h-screen overflow-hidden">
    <!-- Decorative background elements -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div class="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float"></div>
        <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-float" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-primary-light/10 rounded-full blur-[80px] animate-float" style="animation-delay: 4s;"></div>
        <div class="absolute bottom-1/4 left-1/6 w-[250px] h-[250px] bg-accent-light/8 rounded-full blur-[90px]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-primary/8 to-transparent rounded-full"></div>
    </div>

    <Sidebar />
    <MainContent />
</div>
