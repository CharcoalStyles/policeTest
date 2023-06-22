<template>
  <div>
    <div class="bg-nsw-brand-purple-dark py-10 text-center bg-acknowledge">
      <p
        class="text-center text-white font-bold mx-auto relative px-4 md:px-6"
        style="max-width: 50rem"
      >
        The Public Service Commission acknowledges the Gadigal people of the
        Eora Nation, the traditional custodians of the land on which our office
        stands.
      </p>
    </div>
    <footer class="bg-nsw-grey-50">
      <div class="w-full xl:container">
        <div class="px-4 md:px-6 py-12 md:py-16">
          <div class="grid grid-cols-9 gap-12">
            <div class="col-span-9 lg:col-span-3">
              <p class="text-lg font-bold mb-5">Search the PSC</p>
            </div>
            <div class="col-span-9 md:col-span-3 lg:col-span-2">
              <p class="text-lg font-bold mb-5">Connect with us</p>
              <ul>
                <li v-for="item in link.connect" :key="item.label" class="mt-2">
                  <a :href="item.href" class="hover:underline" style="text-underline-offset: 2px">{{ item.label }}</a>
                </li>
              </ul>
            </div>
            <div class="col-span-9 md:col-span-3 lg:col-span-2">
              <p class="text-lg font-bold mb-5">About us</p>
              <ul>
                <li v-for="item in link.about" :key="item.label" class="mt-2">
                  <a :href="item.href" class="hover:underline" style="text-underline-offset: 2px">{{ item.label }}</a>
                </li>
              </ul>
            </div>
            <div class="col-span-9 md:col-span-3 lg:col-span-2">
              <p class="text-lg font-bold mb-5">Key information</p>
              <ul>
                <li v-for="item in link.information" :key="item.label" class="mt-2">
                  <a :href="item.href" class="hover:underline" style="text-underline-offset: 2px">{{ item.label }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div class="bg-nsw-brand-purple-dark">
      <div class="w-full xl:container">
        <div class="px-4 md:px-6 py-8">
          <div class="lg:flex">
            <div class="flex flex-1 justify-center mb-4 lg:mb-0 lg:justify-start">
              <a href="https://www.psc.nsw.gov.au/">
                <img
                  src="/logo_waratah_white.svg"
                  alt="NSW Public Service Commission logo"
                  title="NSW Public Service Commission"
                  class="h-12 lg:h-auto"
                />
              </a>
            </div>
            <div class="flex flex-col lg:flex-row items-center justify-center flex-1 text-center text-white space-y-2 lg:space-y-0 space-x-2 text-sm font-bold">
              <a href="https://www.psc.nsw.gov.au/accessibility" class="hover:underline" style="text-underline-offset: 2px">Accessibility</a>
              <span class="hidden lg:flex">|</span>
              <a href="https://www.psc.nsw.gov.au/privacy-policy" class="hover:underline" style="text-underline-offset: 2px">Privacy&nbsp;Policy</a>
              <span class="hidden lg:flex">|</span>
              <a href="https://www.psc.nsw.gov.au/terms-and-conditions" class="hover:underline" style="text-underline-offset: 2px">Terms&nbsp;&amp;&nbsp;Conditions</a>
            </div>
            <div class="flex items-center flex-1 text-white text-xs text-center lg:text-right font-bold mt-4 lg:mt-0">
              <div class="w-full">
                <p>© 2023 <a href="https://www.psc.nsw.gov.au/accessibility" class="hover:underline" style="text-underline-offset: 2px">NSW Public Service Commission</a></p>
                <p>Website by <a href="https://futurefriendly.team/" target="_blank" class="hover:underline" style="text-underline-offset: 2px">Future Friendly</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 md:px-6 py-6 nsw-footer-border">
          <div class="flex flex-col lg:flex-row items-center justify-center flex-1 text-center text-white space-y-2 lg:space-y-0 space-x-2 text-sm">
            <a href="https://premiersawards.nsw.gov.au/" class="hover:underline" style="text-underline-offset: 2px">Public Service Commission</a>
            <span class="hidden lg:flex">|</span>
            <a href="https://www.psc.nsw.gov.au/privacy-policy" class="hover:underline" style="text-underline-offset: 2px">Premier's Awards</a>
            <span class="hidden lg:flex">|</span>
            <a href="https://www.comprac.nsw.gov.au/" class="hover:underline" style="text-underline-offset: 2px">Communities of Practice</a>
            <span class="hidden lg:flex">|</span>
            <a href="https://sef.psc.nsw.gov.au/" class="hover:underline" style="text-underline-offset: 2px">Senior Executive Fundamentals</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: {
        connect: [
          {
            label: 'PSC LinkedIn',
            href: 'https://www.linkedin.com/company/nsw-public-service-commission/'
          },
          { label: 'I work for NSW', href: 'https://iworkfor.nsw.gov.au/' },
          {
            label: 'I work for NSW LinkedIn',
            href: 'https://www.linkedin.com/company/nsw-government'
          },
          {
            label: 'I work for NSW Facebook',
            href: 'https://www.facebook.com/iworkforNSW/'
          }
        ],
        about: [
          { label: 'Who we are', href: 'https://www.psc.nsw.gov.au/about-us' },
          {
            label: 'Our leadership team',
            href: 'https://www.psc.nsw.gov.au/about-us/our-leadership-team'
          },
          {
            label: 'Our Advisory Board',
            href: 'https://www.psc.nsw.gov.au/about-us/psc-advisory-board'
          },
          {
            label: 'Annual reports',
            href: 'https://www.psc.nsw.gov.au/about-us/annual-reports'
          }
        ],
        information: [
          {
            label: 'Workforce management',
            href: 'https://www.psc.nsw.gov.au/workforce-management'
          },
          {
            label: 'Culture & inclusion',
            href: 'https://www.psc.nsw.gov.au/culture-and-inclusion'
          },
          {
            label: 'Reports & data',
            href: 'https://www.psc.nsw.gov.au/reports-and-data'
          },
          {
            label: 'Legislation & policy',
            href: 'https://www.psc.nsw.gov.au/legislation-and-policy'
          }
        ]
      }
    }
  }
}
</script>
<style>
.bg-acknowledge {
  position: relative;
  background: transparent url(/bg_acknowledgement.jpg) no-repeat scroll center
    center;
  background-size: cover;
}
.bg-acknowledge:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(68, 17, 112, 0.75);
}
.nsw-footer-border {
  border-top: 1px solid rgba(242,242,242,.15);
}
</style>
