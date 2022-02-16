import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { Box, Text, Button } from '@chakra-ui/react'
  import { useDisclosure, useColorModeValue, Spacer } from '@chakra-ui/react'


export default function PrivacyPolicy() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Text fontFamily={'Raleway'} _hover={{cursor: 'pointer', textDecoration: 'underline'}} color={useColorModeValue('#1BA3C1', '#1BA3C1')}><a onClick={onOpen}>Privacy Policy</a></Text>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={{lg: "40em", base: "35em"}} h={'80vh'} overflowY="auto" css={{
                            '&::-webkit-scrollbar': {
                            width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                            width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                            background: '#212121',
                            borderRadius: '24px',
                            },
                        }}>
          <ModalHeader fontFamily={'Raleway'} fontSize="3xl">Privacy Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily={'Raleway'} fontWeight={'light'}>
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Privacy Policy</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. 
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue("#C1272D", "#FF5C61")}>Interpretations and Definitions</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Interpretation</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The words of which the initial letter is capitalized have meanings defined under the following conditions. 
            The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Definitions</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>For the purposes of this Privacy Policy:</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Account means a unique account created for You to access our Service or parts of our Service.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Affiliate means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Application means the software program provided by the Company on any electronic device, named Critique Hall</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Company (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Critique Hall.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Cookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Country refers to: Philippines</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Personal Data is any information that relates to an identified or identifiable individual.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Service refers to the Application or the Website or both.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Website refers to Critique Hall, accessible from &lt;https://critiquehall.vercel.app&gt;</Text>
            <Text fontSize="xs" textAlign={'justify'}>- You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue("#C1272D", "#FF5C61")}>Collecting and Using Your Personal Data</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Types of Data Collected</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>1. Personal Data</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>While using Our Service, We may ask You to provide Us with certain personally
            identifiable information that can be used to contact or identify You.
            Personally identifiable information may include, but is not limited to:</Text>
            <Text fontSize="xs" textAlign={'justify'}>- Email address</Text>
            <Spacer />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Prohibited Uses</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>In addition to other terms as set forth in the Agreement, you are prohibited from using the Website and Services or Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website and Services, third party products and services, or the Internet; (h) to spam, phish, pharm, pretext, spider, crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to interfere with or circumvent the security features of the Website and Services, third party products and services, or the Internet. We reserve the right to terminate your use of the Website and Services for violating any of the prohibited uses.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Dispute Resolution</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Philippines without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of Philippines. 
            The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Philippines, and you hereby submit to the personal jurisdiction of such courts. 
            You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Changes and Amendments</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>We reserve the right to modify this Agreement or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page, and post a notification on the Website. 
            We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided. An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. 
            Your continued use of the Website and Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Acceptance of these Terms</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>You acknowledge that you have read this Agreement and agree to all its terms and conditions. 
            By accessing and using the Website and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Website and Services.</Text>
            <Spacer />
            <br />
            <Text fontSize="xl" color={useColorModeValue('#1BA3C1', '#1BA3C1')}>Contacting Us</Text>
            <Spacer />
            <Text fontSize="sm" textAlign={'justify'}>If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using this email:</Text>
            <Spacer />
            <br />
            <Text fontFamily={'Raleway'} fontStyle={'italic'} color={useColorModeValue("#C1272D", "#FF5C61")}>critiquehall@gmail.com</Text>
            <Spacer />
            <br />
            <Text fontFamily={'Raleway'} fontSize="sm">This Agreement was created on February 16, 2022. No changes have been made since.</Text>
          </ModalBody>

          <ModalFooter>
            <Button fontFamily={'Raleway'}  bgColor={useColorModeValue('#2777C1','#0085FF')} color={useColorModeValue('#FFFFFF', '#FFFFFF')} _hover={{bgColor: useColorModeValue('#56AEFF', '#0B5090')}} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        </>
    )
}
