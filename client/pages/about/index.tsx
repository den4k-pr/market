import Meta from "@/ui/Meta";
import { AboutUs } from "@/ui/about/About";
import Layout from "@/ui/layout/Layout";


export default function AboutUsPage() {
    return (
        <>
            <Meta title='about us'>
                <Layout>
                    <AboutUs />
                </Layout>
            </Meta>
        </>
    )
}