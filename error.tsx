import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/seo";
import { Home, RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  errorCode?: number;
  title?: string;
  message?: string;
}

export default function ErrorPage({ 
  errorCode = 500, 
  title = "Something Went Wrong",
  message = "We encountered an unexpected error. Our team has been notified and is working to fix it."
}: ErrorPageProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <SEO
        title={`Error ${errorCode}`}
        description="An error occurred while processing your request."
      />
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-destructive/10 p-6 rounded-full">
              <AlertTriangle className="h-16 w-16 text-destructive" data-testid="icon-error" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-destructive mb-4" data-testid={`text-${errorCode}`}>
            {errorCode}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {message}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <RefreshCw className="h-5 w-5" />
              What You Can Do
            </CardTitle>
            <CardDescription>
              Try these options to resolve the issue
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button 
              variant="default" 
              className="w-full" 
              onClick={handleRefresh}
              data-testid="button-refresh"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
            <Button variant="outline" className="w-full" data-testid="button-home" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" className="w-full" data-testid="button-episodes" asChild>
              <Link href="/episodes">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Watch Episodes
              </Link>
            </Button>
            <Button variant="outline" className="w-full" data-testid="button-contact" asChild>
              <Link href="/contact">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Report Issue
              </Link>
            </Button>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground">
          Error details have been logged. If the problem persists, please{" "}
          <Link href="/contact">
            <span className="text-primary hover:underline cursor-pointer" data-testid="link-contact-footer">contact our support team</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
