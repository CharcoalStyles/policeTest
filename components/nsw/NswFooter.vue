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
          <div class="grid grid-cols-9 md:gap-12">
            <div class="col-span-9 lg:col-span-3">
              <label class="block text-lg font-bold mb-5" for="footer-search">Search the PSC</label>
              <div class="mb-6">
                <form class="relative" @submit="onSearch">
                  <div class="flex items-center justify-center absolute top-0 left-0 bottom-0 text-nsw-grey-400 select-none pointer-events-none" style="width:44px;">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" class="css-0"><path d="M12.7 11.3c.9-1.2 1.4-2.6 1.4-4.2 0-3.9-3.1-7.1-7-7.1S0 3.2 0 7.1c0 3.9 3.2 7.1 7.1 7.1 1.6 0 3.1-.5 4.2-1.4l3 3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-3-3.1zm-5.6.8c-2.8 0-5.1-2.2-5.1-5S4.3 2 7.1 2s5.1 2.3 5.1 5.1-2.3 5-5.1 5z"></path></svg>
                  </div>
                  <input id="footer-search" v-model="search" class="nsw-form__input max-w-full" type="text" value="" placeholder="Search" style="padding-left:36px;">
                </form>
              </div>
            </div>
            <div class="col-span-9 md:col-span-3 lg:col-span-2">
              <p class="text-lg font-bold mb-5">Connect with us</p>
              <ul class="mb-6">
                <li v-for="item in link.connect" :key="item.label" class="mt-2">
                  <a :href="item.href" class="hover:underline" style="text-underline-offset: 2px">{{ item.label }}</a>
                </li>
              </ul>
            </div>
            <div class="col-span-9 md:col-span-3 lg:col-span-2">
              <p class="text-lg font-bold mb-5">About us</p>
              <ul class="mb-6">
                <li v-for="item in link.about" :key="item.label" class="mt-2">
                  <a :href="item.href" class="hover:underline" style="text-underline-offset: 2px">{{ item.label }}</a>
                </li>
              </ul>
            </div>
            <div class="col-span-9 md:col-span-3 lg:col-span-2">
              <p class="text-lg font-bold mb-5">Key information</p>
              <ul class="mb-6">
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
              <a href="https://www.psc.nsw.gov.au/" target="_blank">
                <img
                  src="/logo_waratah_white.svg"
                  alt="NSW Public Service Commission logo"
                  title="NSW Public Service Commission"
                  class="h-12 lg:h-auto"
                />
              </a>
            </div>
            <div class="flex flex-col lg:flex-row items-center justify-center flex-1 text-center text-white space-y-2 lg:space-y-0 space-x-2 text-sm font-bold">
              <a href="https://www.psc.nsw.gov.au/accessibility" class="hover:underline" style="text-underline-offset: 2px" target="_blank">Accessibility</a>
              <span class="hidden lg:flex">|</span>
              <a href="https://www.psc.nsw.gov.au/privacy-policy" class="hover:underline" style="text-underline-offset: 2px" target="_blank">Privacy&nbsp;Policy</a>
              <span class="hidden lg:flex">|</span>
              <a href="https://www.psc.nsw.gov.au/terms-and-conditions" class="hover:underline" style="text-underline-offset: 2px" target="_blank">Terms&nbsp;&amp;&nbsp;Conditions</a>
            </div>
            <div class="flex items-center flex-1 text-white text-xs text-center lg:text-right font-bold mt-4 lg:mt-0">
              <div class="w-full">
                <p>© 2023 <a href="https://www.psc.nsw.gov.au/accessibility" class="hover:underline" style="text-underline-offset: 2px" target="_blank">NSW Public Service Commission</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 md:px-6 py-6 nsw-footer-border">
          <div class="flex flex-col lg:flex-row items-center justify-center flex-1 text-center text-white space-y-2 lg:space-y-0 space-x-2 text-sm">
            <a href="https://premiersawards.nsw.gov.au/" class="hover:underline" style="text-underline-offset: 2px" target="_blank">Public Service Commission</a>
            <span class="hidden lg:flex">|</span>
            <a href="https://www.psc.nsw.gov.au/privacy-policy" class="hover:underline" style="text-underline-offset: 2px" target="_blank">Premier's Awards</a>
            <span class="hidden lg:flex">|</span>
            <a href="https://www.comprac.nsw.gov.au/" class="hover:underline" style="text-underline-offset: 2px" target="_blank">Communities of Practice</a>
            <span class="hidden lg:flex">|</span>
            <a href="https://sef.psc.nsw.gov.au/" class="hover:underline" style="text-underline-offset: 2px" target="_blank">Senior Executive Fundamentals</a>
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
      search: '',
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
  },
  methods: {
    onSearch(e) {
      e.preventDefault()
      if (this.search && this.search !== '') {
        window.location.href = `https://www.psc.nsw.gov.au/search?q=${this.search}`
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
