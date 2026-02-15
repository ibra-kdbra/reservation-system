<template>
    <div class="static-page">
        <div class="container">
            <h1>Privacy Policy</h1>
            <p class="last-updated">Last updated: {{ new Date().toLocaleDateString() }}</p>

            <section>
                <h2>1. Information We Collect</h2>
                <p>
                    We collect information you provide directly to us, such as when you create an account, make a
                    booking,
                    or communicate with us. This includes your name, email address, phone number, and payment
                    information.
                </p>
            </section>

            <section>
                <h2>2. How We Use Your Information</h2>
                <p>
                    We use your information to facilitate bookings, improve our platform, and communicate with you about
                    your account or trips. We do not sell your personal data to third parties.
                </p>
            </section>

            <section>
                <h2>3. Data Security</h2>
                <p>
                    We implement appropriate technical and organizational measures to protect your personal data against
                    unauthorized access, alteration, disclosure, or destruction.
                </p>
            </section>
        </div>
    </div>
</template>

<style scoped>
.static-page {
    padding: 4rem 0;
}

h1 {
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
}

.last-updated {
    color: var(--color-gray-500);
    margin-bottom: 3rem;
}

section {
    margin-bottom: 2.5rem;
}

h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

p {
    line-height: 1.6;
    color: var(--color-gray-700);
    max-width: 800px;
}
</style>
