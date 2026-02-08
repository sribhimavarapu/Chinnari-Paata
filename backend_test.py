import requests
import sys
from datetime import datetime
import json

class TeluguAppAPITester:
    def __init__(self, base_url="https://telugu-play-learn.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.device_id = f"test_device_{datetime.now().strftime('%H%M%S')}"

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    try:
                        response_data = response.json()
                        print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    except:
                        print(f"   Response: {response.content[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.content[:200]}")

            return success, response.json() if response.content else {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoints(self):
        """Test health check endpoints"""
        print("\n🏥 Testing Health Endpoints...")
        
        # Test root endpoint
        self.run_test("Root Endpoint", "GET", "api/", 200)
        
        # Test health endpoint
        self.run_test("Health Check", "GET", "api/health", 200)

    def test_progress_endpoints(self):
        """Test progress management endpoints"""
        print("\n📊 Testing Progress Endpoints...")
        
        # Test get progress for new device
        success, progress_data = self.run_test(
            "Get Initial Progress", 
            "GET", 
            f"api/progress/{self.device_id}", 
            200
        )
        
        if success:
            # Test save progress
            progress_update = {
                "device_id": self.device_id,
                "letters_heard": ["అ", "ఆ"],
                "words_tapped": ["కుక్క"],
                "rhymes_watched": ["_wFzgFmIMUs"],
                "stickers_earned": ["star"],
                "total_interactions": 5,
                "daily_usage": 2
            }
            
            success, updated_data = self.run_test(
                "Save Progress", 
                "POST", 
                "api/progress", 
                200,
                progress_update
            )
            
            if success:
                # Verify the update
                self.run_test(
                    "Verify Progress Update", 
                    "GET", 
                    f"api/progress/{self.device_id}", 
                    200
                )

    def test_analytics_endpoint(self):
        """Test analytics endpoint"""
        print("\n📈 Testing Analytics Endpoint...")
        
        self.run_test(
            "Get Analytics", 
            "GET", 
            f"api/analytics/{self.device_id}", 
            200
        )

    def test_status_endpoints(self):
        """Test status check endpoints (backward compatibility)"""
        print("\n🔄 Testing Status Endpoints...")
        
        # Test create status check
        status_data = {
            "client_name": "test_client"
        }
        
        self.run_test(
            "Create Status Check", 
            "POST", 
            "api/status", 
            200,
            status_data
        )
        
        # Test get status checks
        self.run_test(
            "Get Status Checks", 
            "GET", 
            "api/status", 
            200
        )

    def cleanup_test_data(self):
        """Clean up test data"""
        print("\n🧹 Cleaning up test data...")
        
        self.run_test(
            "Reset Progress", 
            "DELETE", 
            f"api/progress/{self.device_id}", 
            200
        )

def main():
    print("🚀 Starting Telugu Learning App API Tests...")
    print("=" * 60)
    
    # Setup
    tester = TeluguAppAPITester()
    
    try:
        # Run all tests
        tester.test_health_endpoints()
        tester.test_progress_endpoints()
        tester.test_analytics_endpoint()
        tester.test_status_endpoints()
        tester.cleanup_test_data()
        
        # Print results
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
        
        success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if tester.tests_passed == tester.tests_run:
            print("🎉 All tests passed! Backend API is working correctly.")
            return 0
        else:
            print("⚠️  Some tests failed. Check the issues above.")
            return 1
            
    except Exception as e:
        print(f"\n💥 Test suite failed with error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())